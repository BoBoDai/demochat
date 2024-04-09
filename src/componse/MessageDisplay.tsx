import React from 'react';
import styled from 'styled-components/native';
import {MessageType} from '../model/Message.ts';

interface MessageDisplayProps {
  messageList: Array<MessageType>;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({messageList}) => {
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
    <Messages>
      {messageList.map((messageItem: MessageType, index: number) => (
        <Message key={index}>
          <MessageText>{messageItem.text}</MessageText>
          <MessageTime>{getYearMonthDay(messageItem.timestamp)}</MessageTime>
        </Message>
      ))}
    </Messages>
  );
};
export default MessageDisplay;

const Messages = styled.View`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
  flex-direction: column;
`;

const Message = styled.View`
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
