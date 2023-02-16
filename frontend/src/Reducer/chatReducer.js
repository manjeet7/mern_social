import * as actions from "../constants/chat/chat";

export const createConversationReducer = (
    state = { conversation: "" },
    action
) => {
    switch (action.type) {
        case actions.CREATE_CONVERSATION_REQUEST:
            return {
                loading: true,
            };
        case actions.CREATE_CONVERSATION_SUCCESS:
            return {
                loading: false,
                success: true,
                conversation: action.payload,
            };
        case actions.CREATE_CONVERSATION_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
