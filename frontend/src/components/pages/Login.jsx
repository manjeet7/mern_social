import React from "react";
import styles from "../../styles/login.module.css";
import { useRef } from "react";
import { useHistory } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo_1.png";
import ApiService from "../../services/ApiService";
import {
    API_PATH,
    API_LOGIN,
    ERR_SERVER_CONNECT,
} from "../../constants/ApiConstants";
import SessionStorageService from "../../services/SessionStorageService";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const history = useHistory();

    const { isFetching, error, dispatch } = useContext(AuthContext);
    const data1 = "";
    const handleClick = async (e) => {
        e.preventDefault();
        var requestData = {
            username: email.current.value,
            password: password.current.value,
        };
        console.log("Email/mobile number: ", email.current.value);
        console.log("Password: ", password.current.value);

        ApiService.postRequest(API_PATH, API_LOGIN, requestData, "").then(
            (result) => {
                console.log("API service response: ", result);
                if (result.success === true) {
                    alert("Login Successful!");

                    console.log("token: ", result.data.accessToken);
                    console.log("user-data: ", result.data.data);
                    SessionStorageService.setSessionStorage(
                        "userAccessToken",
                        result.data.accessToken
                    );
                    SessionStorageService.setSessionStorage(
                        "userData",
                        result.data.data
                    );
                    history.push("/home");
                } else {
                    alert(result.message);
                }
            },
            (error) => {
                console.log("API service error: ", error);
                alert(ERR_SERVER_CONNECT);
            }
        );
    };

    const handleForget = (e) => {
        e.preventDefault();
        history.push("/forget");
    };
    const handleRegisterRedirect = (e) => {
        history.push("/register");
    };

    return (
        <div>
            <div className={styles.login}>
                <div className={styles.loginWrapper}>
                    <div className={styles.loginLeft}>
                        <img src={logo}></img>
                        <h3 className={styles.loginLogo}>Farmer's Connect</h3>
                        <span className={styles.loginDesc}>
                            Communicate with your fellow farmers on Farmer's
                            Connect!
                        </span>
                    </div>
                    <div className={styles.loginRight}>
                        <form
                            className={styles.loginBox}
                            onSubmit={handleClick}
                        >
                            <span className={styles.loginLabel}>Login</span>
                            <input
                                placeholder="User Id"
                                type="text"
                                required
                                className={styles.loginInput}
                                ref={email}
                            />

                            <input
                                placeholder="Password"
                                type="password"
                                required
                                minLength="6"
                                className={styles.loginInput}
                                ref={password}
                            />
                            <button
                                className={styles.loginButton}
                                type="submit"
                                disabled={isFetching}
                            >
                                {isFetching ? "loading" : "Log in"}
                            </button>
                            <span
                                className={styles.loginForgot}
                                onClick={handleForget}
                            >
                                Forgot Password?
                            </span>
                            <button
                                className={styles.loginRegisterButton}
                                onClick={handleRegisterRedirect}
                            >
                                Create a New Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
