import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://b328a91df30a.ngrok.io/api/',
    headers: {
        "Content-Type":"application/json",
        "Accept" : "application/json"
    }
  });

export default instance;
