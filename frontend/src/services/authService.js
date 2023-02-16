import axios from "axios";
import { Alert } from "react-bootstrap";
import SessionStorageService from "./SessionStorageService";

export const login = async (email, password) => {
    console.log("reached login", email, password);
    try {
        const data = await axios.post("http://localhost:4009/api/auth/login", {
            email,
            password,
        });
        console.log("data is ", data);
        if (data.data.token) {
            localStorage.setItem("token", data.data.token);
            const user = {
                name: data.data.name,
                email: data.data.email,
                id: data.data._id,
            };
            console.log("user is ", user);
            localStorage.setItem("user", JSON.stringify(user));
        }
        return data;
    } catch (error) {
        return error;
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export const register = async (name, email, password) => {
    console.log("reached the method");
    const data = await axios.post("http://localhost:4009/api/register", {
        name,
        email,
        password,
    });
    console.log("register data ", data);
};

export const getCurrentUser = () => {
    // SessionStorageService.getSessionStorage("userData").then((response) => {
    //     console.log("User information", response);

    //     if(response) {

    //         var user = {
    //             name: response.username,
    //             email: response.email,
    //             _id: 1
    //         };

    //         return user;

    //     } else {
    //         console.log("Unable does not exist");
    //     }

    // }, (error) => {
    //     console.log("Unable to get user info from storage", error);
    // });
    return {
        name: "manjeet",
        email: "manjeet@example.com",
        _id: 1,
    };
};
