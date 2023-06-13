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

export const folloUserReducer = (state = {}, action) => {
    console.log("follow user reducer");
    // switch (action.type) {
    //     case actions.FOLLOW_USER_REQUEST:
    //         return {
    //             ...state,
    //             loading: true,
    //         };
    //     case actions.FOLLOW_USER_SUCCESS:
    //         return {
    //             loading: false,
    //             success: true,
    //             user: {
    //                 ...state.user,
    //                 followings: [...state.user.followings, action.payload],
    //             },
    //         };
    //     case actions.FOLLOW_USER_FAIL:
    //         return {
    //             loading: false,
    //             error: action.payload,
    //         };
    //     default:
    //         return state;
    // }
};

export const unfolloUserReducer = (state = {}, action) => {
    // switch (action.type) {
    //     case actions.UNFOLLOW_USER_REQUEST:
    //         return {
    //             ...state,
    //             loading: true,
    //         };
    //     case actions.UNFOLLOW_USER_SUCCESS:
    //         return {
    //             loading: false,
    //             success: true,
    //             user: action.payload,
    //         };
    //     case actions.UNFOLLOW_USER_FAIL:
    //         return {
    //             loading: false,
    //             error: action.payload,
    //         };
    //     default:
    //         return state;
    // }
};
