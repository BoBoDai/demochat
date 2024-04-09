import {Button} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {MessageType} from '../model/Message.ts';

interface InputMessageProps {
  sendMessage: (message: MessageType) => void;
}

const InputMessage: React.FC<InputMessageProps> = ({sendMessage}) => {
  const [inputMessage, setInputMessage] = useState('');

  const send = () => {
    const message: MessageType = {
      text: inputMessage,
      timestamp: Date.now(),
    };
    sendMessage(message);
    setInputMessage('');
  };

  return (
    <MessageInputView>
      <InputView
        placeholder="Message..."
        value={inputMessage}
        onChangeText={setInputMessage}
      />
      <Button title="Send" onPress={send} />
    </MessageInputView>
  );
};

export default InputMessage;

const MessageInputView = styled.View`
  padding: 10px;
  flex-direction: row;
`;
const InputView = styled.TextInput`
  flex: 1;
`;
