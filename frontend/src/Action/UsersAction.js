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
