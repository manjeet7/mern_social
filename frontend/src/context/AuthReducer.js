const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            };

        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };

        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: action.payload,
            };

        case "FORGOT_PASSWORD_REQUEST":
            return {
                data: null,
                isFetching: true,
                error: false,
            };
        case "FORGOT_PASSWORD_SUCCESS":
            return {
                data: action.payload,
                isFetching: true,
                error: false,
            };
        case "FORGOT_PASSWORD_FAILURE":
            return {
                data: null,
                isFetching: true,
                error: action.payload,
            };

        case "RESET_PASSWORD_REQUEST":
            return {
                data: null,
                isFetching: true,
                error: false,
            };
        case "RESET_PASSWORD_SUCCESS":
            return {
                data: action.payload,
                isFetching: true,
                error: false,
            };
        case "RESET_PASSWORD_FAILURE":
            return {
                data: null,
                isFetching: true,
                error: action.payload,
            };
        case "FOLLOW":
            console.log("following is working");
            return {
                ...state,
                user: {
                    ...state.user,
                    following: [...state.user.following, action.payload],
                },
            };

        case "UNFOLLOW":
            console.log("unfollowing is working");
            return {
                ...state,
                user: {
                    ...state.user,
                    following: state.user.following.filter(
                        (followings) => followings !== action.payload
                    ),
                },
            };

        default:
            return state;
    }
};

export default AuthReducer;
