import axios from "axios"

export const axiosService = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

export const axiosPrivateInstance = axios.create({
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})