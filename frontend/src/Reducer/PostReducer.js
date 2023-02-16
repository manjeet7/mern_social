import * as actions from "../constants/postConstant/post";

export const createPostReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case actions.CREATE_POST_REQUEST:
            return {
                loading: true,
                posts: [],
            };
        case actions.CREATE_POST_SUCCESS:
            return {
                loading: false,
                success: true,
                posts: action.payload,
            };
        case actions.CREATE_POST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const getPostReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case actions.CREATE_POST_REQUEST:
            return {
                loading: true,
                posts: [],
            };
        case actions.POST_LIST_SUCCESS:
            return {
                loading: false,
                success: true,
                posts: action.payload,
            };
        case actions.POST_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const postLikeReducer = (state = { likes: {} }, action) => {
    switch (action.type) {
        case actions.POST_LIKES_REQUEST:
            return {
                loading: true,
                posts: [],
            };
        case actions.POST_LIKES_SUCCESS:
            return {
                loading: false,
                success: true,
                likes: action.payload,
            };
        case actions.POST_LIKES_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
