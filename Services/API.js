import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://1f1ba12c2d68.ngrok.io/api/',
    headers: {
        "Content-Type":"application/json",
        "Accept" : "application/json"
    }
  });

export default instance;
