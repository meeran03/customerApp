import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://0482c10bd588.ngrok.io/api/',
    headers: {
        "Content-Type":"application/json",
        "Accept" : "application/json"
    }
  });

export default instance;
