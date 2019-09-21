import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://localhost:3334'
    baseURL: 'https://api-tindev.azurewebsites.net'
});

export default api;