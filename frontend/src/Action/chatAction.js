import axios from "axios";
import * as actions from "../constants/chat/chat";
import SessionStorageService from "../services/SessionStorageService";

export const getConversationAction = (userId) => async (dispatch) => {
    try {
        dispatch({
            type: actions.CREATE_CONVERSATION_REQUEST,
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
            `http://localhost:3001/api/conversation/getConvo/${userId}`,
            config
        );
        console.log("inside conversation ", result);
        dispatch({
            type: actions.CREATE_CONVERSATION_SUCCESS,
            payload: result.data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.CREATE_CONVERSATION_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
