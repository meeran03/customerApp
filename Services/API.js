import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://dcd677deebaf.ngrok.io/api/',
    headers: {
        "Content-Type":"application/json",
        "Accept" : "application/json"
    }
  });

export default instance;
