/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import apiClient from './src/client/apiClient.js';

type MessageType = {
  text: string;
  timestamp: number;
};

function App(): React.JSX.Element {
  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    console.log('start');
    const socket = new WebSocket('ws://localhost:8080/chat');
    socket.onopen = () => console.log('WebSocket Connected');
    socket.onmessage = event => {
      console.log('on message');
      const message = JSON.parse(event.data);
      console.log('get message', message);
      setMessageList(prev => [...prev, message]);
    };
    return () => socket.close();
  }, []);
  const sendMessage = () => {
    const oneMessage = {
      text: inputMessage,
      timestamp: Date.now(),
    };
    apiClient
      .post('/send-message', oneMessage)
      .then(() => {
        console.log('send success with', oneMessage.text);
      })
      .catch(e => {
        console.log(e.message);
      });
    setMessageList([...messageList, oneMessage]);
    setInputMessage('');
  };

  const getYearMonthDay = (timestamp: number) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };

  return (
    <SafeAreaView>
      <Page>
        <Header>
          <HeaderText>Friendly Chat</HeaderText>
        </Header>
        <Messages>
          {messageList.map((messageItem, index) => (
            <Message key={index}>
              <MessageText>{messageItem.text}</MessageText>
              <MessageTime>
                {getYearMonthDay(messageItem.timestamp)}
              </MessageTime>
            </Message>
          ))}
        </Messages>
        <MessageInputView>
          <InputView
            placeholder="Message..."
            value={inputMessage}
            onChangeText={setInputMessage}
          />
          <Button title="Send" onPress={sendMessage} />
        </MessageInputView>
      </Page>
    </SafeAreaView>
  );
}

const Page = styled.View`
  justify-content: space-between;
  height: 100%;
`;
const Messages = styled.View`
  flex: 1;
  display: flex;
  overflow-y: auto;
  margin-bottom: 10px;
  flex-direction: column;
`;

const Message = styled.View`
  display: block;
  margin-top: 10px;

  padding-top: 10px;
  padding-left: 20px;
`;

const MessageText = styled.Text`
  font-size: 20px;
`;

const MessageTime = styled.Text`
  margin-top: 10px;
  font-size: 12px;
  color: rgb(150, 150, 150);
`;

const Header = styled.View`
  background: rgb(59, 134, 203);
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const HeaderText = styled.Text`
  color: white;
  font-size: 25px;
  font-weight: bold;
`;
const MessageInputView = styled.View`
  padding: 10px;
  flex-direction: row;
`;
const InputView = styled.TextInput`
  flex: 1;
`;

export default App;
