import * as actions from "../constants/friend/friend";

export const createRequesntReducer = (state = { message: "" }, action) => {
    switch (action.type) {
        case actions.FRIEND_REQUEST_REQUEST:
            return {
                loading: true,
            };
        case actions.FRIEND_REQUEST_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload,
            };
        case actions.FRIEND_REQUEST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const incomingRequesntReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
        case actions.INCOMING_REQUEST_REQUEST:
            return {
                loading: true,
            };
        case actions.INCOMING_REQUEST_SUCCESS:
            return {
                loading: false,
                success: true,
                requests: action.payload,
            };
        case actions.INCOMING_REQUEST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const acceptRequesntReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.ACCEPT_REQUEST_REQUEST:
            return {
                loading: true,
            };
        case actions.ACCEPT_REQUEST_SUCCESS:
            return {
                loading: false,
                success: true,
                accept: action.payload,
            };
        case actions.ACCEPT_REQUEST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const getFollowersReducer = (state = { id: {} }, action) => {
    switch (action.type) {
        case actions.GET_FOLLOWERS_REQUEST:
            return {
                loading: true,
            };
        case actions.GET_FOLLOWERS_SUCCESS:
            return {
                loading: false,
                success: true,
                id: action.payload,
            };
        case actions.GET_FOLLOWERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const getFriendsReducer = (state = { friends: [] }, action) => {
    switch (action.type) {
        case actions.GET_FRIENDS_REQUEST:
            return {
                loading: true,
            };
        case actions.GET_FRIENDS_SUCCESS:
            return {
                loading: false,
                success: true,
                friends: action.payload,
            };
        case actions.GET_FRIENDS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const checkFriendsReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.CHECK_FRIENDS_REQUEST:
            return {
                loading: true,
            };
        case actions.CHECK_FRIENDS_SUCCESS:
            return {
                loading: false,
                success: true,
                confirmFriend: action.payload,
            };
        case actions.CHECK_FRIENDS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
