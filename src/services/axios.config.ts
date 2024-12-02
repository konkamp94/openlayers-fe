import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export const axiosInstance = axios.create({
    baseURL: apiBaseUrl
});