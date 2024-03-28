import {Button} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import SendMessageApi from '../client/apiClient.ts';
import {MessageType} from '../model/Message.ts';

interface InputMessageProps {
  addMessageInList: (message: MessageType) => void;
}

const InputMessage: React.FC<InputMessageProps> = ({addMessageInList}) => {
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    const message: MessageType = {
      text: inputMessage,
      timestamp: Date.now(),
    };
    SendMessageApi(message);
    addMessageInList(message);
    setInputMessage('');
  };

  return (
    <MessageInputView>
      <InputView
        placeholder="Message..."
        value={inputMessage}
        onChangeText={setInputMessage}
      />
      <Button title="Send" onPress={sendMessage} />
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
