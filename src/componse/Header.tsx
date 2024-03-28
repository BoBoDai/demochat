import React from 'react';
import styled from 'styled-components/native';

const Header = () => {
  return (
    <HeaderView>
      <HeaderText>Friendly Chat</HeaderText>
    </HeaderView>
  );
};

export default Header;

const HeaderView = styled.View`
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
