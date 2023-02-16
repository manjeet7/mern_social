import axios from "./utils/client.js";
import {
    LoginFailure,
    LoginStart,
    LoginSuccess,
    Resetfailure,
    Resetstart,
    Resetsuccess,
    forgotfailure,
    forgotstart,
    forgotsuccess,
} from "./context/AuthActions";

export const loginCall = async (userCredential, dispatch) => {
    dispatch(LoginStart);
    try {
        const res = await axios.post("auth/login", userCredential);
        dispatch(LoginSuccess(res.data));
    } catch (err) {
        dispatch(LoginFailure(err));
    }
};

export const forgotPassword = async (dispatch) => {
    dispatch(forgotstart);
    try {
        const res = await axios.post("auth/login");
        dispatch(forgotsuccess(res.data));
    } catch (err) {
        dispatch(forgotfailure(err));
    }
};

export const resetPassword = async (dispatch) => {
    dispatch(Resetstart);
    try {
        const res = await axios.post("auth/login");
        dispatch(Resetsuccess(res.data));
    } catch (err) {
        dispatch(Resetfailure(err));
    }
};
