import axios from "axios";
import * as actions from "../constants/postConstant/post";
import SessionStorageService from "../services/SessionStorageService";

export const createPostAction = (data) => async (dispatch) => {
    try {
        dispatch({
            type: actions.CREATE_POST_REQUEST,
        });
        const token = await SessionStorageService.getSessionStorage(
            "userAccessToken"
        );
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };
        const result = await axios.post(
            "http://localhost:3001/api/posts/create",
            data,
            config
        );
        dispatch({
            type: actions.CREATE_POST_SUCCESS,
            payload: result.data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.CREATE_POST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getPostAction = () => async (dispatch) => {
    try {
        dispatch({
            type: actions.POST_LIST_REQUEST,
        });
        const token = await SessionStorageService.getSessionStorage(
            "userAccessToken"
        );
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };
        const result = await axios.get(
            "http://localhost:3001/api/posts",
            config
        );

        dispatch({
            type: actions.POST_LIST_SUCCESS,
            payload: result.data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.POST_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const likePostAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: actions.POST_LIKES_REQUEST,
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
            "http://localhost:3001/api/posts/like",
            { id },
            config
        );

        dispatch({
            type: actions.POST_LIKES_SUCCESS,
            payload: result.data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.POST_LIKES_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
