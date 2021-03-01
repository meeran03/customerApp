import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://292ff4a9bcef.ngrok.io/api/',
    headers: {
        "Content-Type":"application/json",
        "Accept" : "application/json"
    }
  });

export default instance;
