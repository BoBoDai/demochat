/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Button, SafeAreaView} from 'react-native';

import styled from 'styled-components/native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <Page>
        <Header>
          <HeaderText>Friendly Chat</HeaderText>
        </Header>
        <Messages />
        <MessageInputView>
          <InputView placeholder="Message..." />
          <Button title="Send" />
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
  background-color: lightgrey;
  padding: 10px;
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
