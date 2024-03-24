/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {Button, SafeAreaView} from 'react-native';

import styled from 'styled-components/native';

type MessageType = {
  text: string;
  timestamp: number;
};

function App(): React.JSX.Element {
  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    const oneMessage = {
      text: message,
      timestamp: Date.now(),
    };
    setMessageList([...messageList, oneMessage]);
    setMessage('');
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
            value={message}
            onChangeText={setMessage}
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
