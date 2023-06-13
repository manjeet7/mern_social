import axios from "axios";
import SessionStorageService from "../services/SessionStorageService";

const API = axios.create({
    baseURL: "http://localhost:3001/api/users",
});

API.interceptors.request.use((req) => {
    if (sessionStorage.getItem("userAccessToken")) {
        req.headers.Authorization = `Bearer ${JSON.parse(
            sessionStorage.getItem("userAccessToken")
        )}`;
    }
    return req;
});

export const getFollowers = async (id) => {
    API.post(`/check/${id}`);
};
