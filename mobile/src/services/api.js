import axios from 'axios';
import { CONFIG } from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: CONFIG.apiUrl,
    timeout: CONFIG.timeout,
});

// 请求拦截器
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// API 方法
export const login = (username, password) => {
    return api.post('/auth/login', { username, password });
};

export const getVehicleInfo = (licensePlate) => {
    return api.get(`/vehicles/${licensePlate}`);
};

export const updateVehicleInfo = (id, data) => {
    return api.put(`/vehicles/${id}`, data);
};

export const scanVehicle = (imageData) => {
    return api.post('/vehicles/scan', { image: imageData });
};

export default api;
