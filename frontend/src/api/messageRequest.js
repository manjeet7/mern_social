import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001/api/message" });

API.interceptors.request.use((req) => {
    if (sessionStorage.getItem("userAccessToken")) {
        req.headers.Authorization = `Bearer ${JSON.parse(
            sessionStorage.getItem("userAccessToken")
        )}`;
    }
    return req;
});

export const getMessages = (id) => API.post(`/getMessage/${id}`);
export const addMessage = (data) => API.post("/newMessage", data);
