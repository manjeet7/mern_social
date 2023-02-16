import axios from "axios";
import * as actions from "../constants/friend/friend";
import SessionStorageService from "../services/SessionStorageService";

export const createRequestAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: actions.FRIEND_REQUEST_REQUEST,
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
        const result = await axios.post(
            "http://localhost:3001/api/friend/sendRequest",
            { ids: id },
            config
        );

        dispatch({
            type: actions.FRIEND_REQUEST_SUCCESS,
            payload: result.data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.FRIEND_REQUEST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const incomingRequestAction = () => async (dispatch) => {
    try {
        dispatch({
            type: actions.INCOMING_REQUEST_REQUEST,
        });
        const token = await SessionStorageService.getSessionStorage(
            "userAccessToken"
        );
        const config = {
            headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const result = await axios.post(
            "http://localhost:3001/api/friend/incoming",
            {},
            config
        );
        console.log("inside incoming request ", result);
        dispatch({
            type: actions.INCOMING_REQUEST_SUCCESS,
            payload: result.data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.INCOMING_REQUEST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const acceptRequestAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: actions.ACCEPT_REQUEST_REQUEST,
        });
        const token = await SessionStorageService.getSessionStorage(
            "userAccessToken"
        );
        const config = {
            headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const result = await axios.post(
            "http://localhost:3001/api/friend/accept",
            { id },
            config
        );

        dispatch({
            type: actions.ACCEPT_REQUEST_SUCCESS,
            payload: result.data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.ACCEPT_REQUEST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const requestStatusAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: actions.STATUS_REQUEST_REQUEST,
        });
        const token = await SessionStorageService.getSessionStorage(
            "userAccessToken"
        );
        const config = {
            headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const result = await axios.post(
            "http://localhost:3001/api/friend/getStatus",
            { id },
            config
        );
        console.log("inside friend status action ", result);
        dispatch({
            type: actions.STATUS_REQUEST_SUCCESS,
            payload: result.data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.STATUS_REQUEST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const friendListAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: actions.GET_FRIENDS_REQUEST,
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
            "http://localhost:3001/api/friend/getFriends",

            config
        );
        console.log("inside friendList action ", result);
        dispatch({
            type: actions.GET_FRIENDS_SUCCESS,
            payload: result.data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.GET_FRIENDS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const checkFriendAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: actions.CHECK_FRIENDS_REQUEST,
        });
        const token = await SessionStorageService.getSessionStorage(
            "userAccessToken"
        );
        const config = {
            headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const result = await axios.post(
            "http://localhost:3001/api/friend/check",
            { id },
            config
        );
        console.log("inside check friend action ", result);
        dispatch({
            type: actions.CHECK_FRIENDS_SUCCESS,
            payload: result.data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.CHECK_FRIENDS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
