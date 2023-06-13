import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001/api/conversation" });

API.interceptors.request.use((req) => {
    if (sessionStorage.getItem("userAccessToken")) {
        req.headers.Authorization = `Bearer ${JSON.parse(
            sessionStorage.getItem("userAccessToken")
        )}`;
    }
    return req;
});

export const createChat = (data) => API.post("/create");
export const userChats = (userId) => API.post(`/getConvo/${userId}`);
export const findChat = (firstId, secondId) =>
    API.post(`/getTwoConvo/${firstId}/${secondId}`);
