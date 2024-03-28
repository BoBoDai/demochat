import axios from 'axios';
import {MessageType} from '../model/Message.ts';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});
const SendMessageApi = (message: MessageType) => {
  apiClient
    .post('/send-message', message)
    .then(() => {
      console.log('send success with', message.text);
    })
    .catch(e => {
      console.log(e.message);
    });
};

export default SendMessageApi;
