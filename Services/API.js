import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://854adc8f1e00.ngrok.io/api/',
    headers: {
        "Content-Type":"application/json",
        "Accept" : "application/json"
    }
  });

export default instance;
