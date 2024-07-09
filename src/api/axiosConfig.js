import axios from 'axios';

export const API_KEY = process.env.REACT_APP_API_KEY;

const axiosInstance = axios.create({
    baseURL: 'https://www.omdbapi.com',
});

axiosInstance.interceptors.request.use(
    (config) => {
        config.params = {
            ...config.params,
            apikey: API_KEY,
        };
        console.log('Request started');
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response received');
        return response;
    },
    (error) => {
        console.error('Response error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
