/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import {Client} from '@stomp/stompjs';
import Header from './src/componse/Header.tsx';
import InputMessage from './src/componse/InputMessage.tsx';
import MessageDisplay from './src/componse/MessageDisplay.tsx';

type MessageType = {
  text: string;
  timestamp: number;
};

function App(): React.JSX.Element {
  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const [stompClient, setStompClient] = useState<Client>();

  useEffect(() => {
    console.log('start');

    const socket2 = new WebSocket('ws://localhost:8080/chat');
    socket2.onopen = () => {
      console.log('WebSocket Connected');
    };

    const socket = new Client({brokerURL: 'ws://localhost:8080/chat'});
    socket.onConnect = frame => {
      console.log('Connected: ' + frame);
      socket.subscribe('/topic/greetings', event => {
        JSON.parse(event.body);
      });
    };
    setStompClient(socket);

    return () => {
      socket.deactivate();
    };
  }, []);

  useEffect(() => {
    if (stompClient) {
      console.log('activate', stompClient.active);
      stompClient.activate();
    }
  }, [stompClient]);

  const addMessageInList = useCallback(
    (message: MessageType) => {
      setMessageList([...messageList, message]);
    },
    [messageList],
  );

  return (
    <SafeAreaView>
      <Page>
        <Header />
        <MessageDisplay messageList={messageList} />
        <InputMessage addMessageInList={addMessageInList} />
      </Page>
    </SafeAreaView>
  );
}

const Page = styled.View`
  justify-content: space-between;
  height: 100%;
`;

export default App;
