import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://28b963ce16f8.ngrok.io/api/',
    headers: {
        "Content-Type":"application/json",
        "Accept" : "application/json"
    }
  });

export default instance;