import * as actions from "../constants/user/user";

export const getUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case actions.USER_LIST_REQUEST:
            return {
                loading: true,
                posts: [],
            };
        case actions.USER_LIST_SUCCESS:
            return {
                loading: false,
                success: true,
                users: action.payload,
            };
        case actions.USER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const usersDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case actions.USER_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case actions.USER_DETAILS_SUCCESS:
            return {
                loading: false,
                success: true,
                user: action.payload,
            };
        case actions.USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
