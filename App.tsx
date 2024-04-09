/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import Header from './src/componse/Header.tsx';
import InputMessage from './src/componse/InputMessage.tsx';
import MessageDisplay from './src/componse/MessageDisplay.tsx';
import 'text-encoding';
import {Client} from '@stomp/stompjs';

type MessageType = {
  text: string;
  timestamp: number;
};

function App(): React.JSX.Element {
  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const [websocket, setWebsocket] = useState<Client>();

  useEffect(() => {
    const websocket = new Client({brokerURL: 'ws://localhost:8080/chat'});
    websocket.onConnect = frame => {
      console.log('Connected: ' + frame);
      websocket.publish({destination: '/app/data/sync'});
      websocket.subscribe('/topic/messages', message => {
        const receivedMessage = JSON.parse(message.body) as Array<MessageType>;
        receivedMessage.forEach(it => {
          setMessageList(pre => [...pre, it]);
        });
      });
    };
    setWebsocket(websocket);
    websocket.activate();
    return () => {
      websocket.deactivate();
    };
  }, []);

  const sendMessage = useCallback(
    (message: MessageType) => {
      websocket?.publish({
        destination: '/app/chat',
        body: JSON.stringify(message),
      });
    },
    [websocket],
  );

  return (
    <SafeAreaView>
      <Page>
        <Header />
        <MessageDisplay messageList={messageList} />
        <InputMessage sendMessage={sendMessage} />
      </Page>
    </SafeAreaView>
  );
}

const Page = styled.View`
  justify-content: space-between;
  height: 100%;
`;

export default App;
