import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: JSON.parse(sessionStorage.getItem("userData")) || null,
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        sessionStorage.setItem("userData", JSON.stringify(state.user));
        console.log("inside auth context user");
    }, [state.user]);
    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
