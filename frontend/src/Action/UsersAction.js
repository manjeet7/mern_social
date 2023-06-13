import axios from "axios";
import * as actions from "../constants/user/user";
import SessionStorageService from "../services/SessionStorageService";

export const getUsersAction = () => async (dispatch) => {
    try {
        dispatch({
            type: actions.USER_LIST_REQUEST,
        });
        const token = await SessionStorageService.getSessionStorage(
            "userAccessToken"
        );
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const result = await axios.get(
            "http://localhost:3001/api/users/me",
            config
        );
        dispatch({
            type: actions.USER_LIST_SUCCESS,
            payload: result.data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.USER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getUserDetailsAction = (id) => async (dispatch) => {
    console.log("user details inside");
    try {
        dispatch({
            type: actions.USER_DETAILS_REQUEST,
        });
        const token = await SessionStorageService.getSessionStorage(
            "userAccessToken"
        );
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const result = await axios.get(
            `http://localhost:3001/api/users/${id}`,
            config
        );
        console.log("users action ", result);
        dispatch({
            type: actions.USER_DETAILS_SUCCESS,
            payload: result.data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const followUserAction = (id, data) => async (dispatch) => {
    try {
        dispatch({
            type: actions.FOLLOW_USER_REQUEST,
        });
        // const token = await SessionStorageService.getSessionStorage(
        //     "userAccessToken"
        // );
        // const config = {
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${token}`,
        //     },
        // };
        // console.log("config is ", config);
        // const result = await axios.post(
        //     `http://localhost:3001/api/users/${id}/follow`,
        //     data,
        //     config
        // );
        // console.log("follow user action ", result);
        dispatch({
            type: actions.FOLLOW_USER_SUCCESS,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: actions.FOLLOW_USER_SUCCESS,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const unFollowAction = (_id, data) => async (dispatch) => {
    try {
        dispatch({
            type: actions.UNFOLLOW_USER_REQUEST,
        });
        const token = await SessionStorageService.getSessionStorage(
            "userAccessToken"
        );
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const data = {
            name: {
                name: "rahul",
            },
        };
        const result = await axios.post(
            `http://localhost:3001/api/users/${_id}/unfollow`,
            data,
            config
        );
        // console.log("unfollowr users action ", result);
        dispatch({
            type: actions.UNFOLLOW_USER_SUCCESS,
            payload: result.data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.UNFOLLOW_USER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
