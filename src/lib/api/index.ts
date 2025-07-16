import axios from 'axios';

   const api = axios.create({
     baseURL: 'https://inovasibackend.bengkulukota.go.id/api',
     headers: {
       'Content-Type': 'application/json',
     },
     timeout: 10000,
   });

   export default api;