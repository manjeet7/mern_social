export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error,
});

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});

export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});

export const forgotstart = (data) => ({
    type: "FORGOT_PASSWORD_REQUEST",
});

export const forgotsuccess = (data) => ({
    type: "FORGOT_PASSWORD_SUCCESS",
    payload: data,
});

export const forgotfailure = (error) => ({
    type: "FORGOT_PASSWORD_FAILURE",
    payload: error,
});

export const Resetstart = (data) => ({
    type: "RESET_PASSWORD_REQUEST",
});

export const Resetsuccess = (data) => ({
    type: "RESET_PASSWORD_SUCCESS",
    payload: data,
});

export const Resetfailure = (error) => ({
    type: "RESET_PASSWORD_FAILURE",
    payload: error,
});
