import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://f1071b9f1ef4.ngrok.io/api/',
    headers: {
        "Content-Type":"application/json",
        "Accept" : "application/json"
    }
  });

export default instance;
