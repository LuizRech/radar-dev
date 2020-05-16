import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.188.60:3333'
});

export default api;