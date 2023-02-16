import React from 'react';
import styles from "../../styles/reset.module.css";
import { } from "@material-ui/icons";
import { useRef } from 'react';
import {loginCall} from "../../apiCalls"
import { useHistory } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import  logo   from '../../assets/logo_1.png';

export default function Reset() {

    const confimPassword = useRef();
    const password = useRef();
    const history = useHistory()
    
    const {isFetching, error, dispatch} = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault();
        if (confimPassword.current.value !== password.current.value) {
            confimPassword.current.setCustomValidity("Passwords don't match!");
        } 
        loginCall(
            { email: confimPassword.current.value, password: password.current.value },
            dispatch).then(error => {
                if (error)
                confimPassword.current.setCustomValidity("User Login Failed");
            })
    }
  
    const handleForget = (e)=>{
        e.preventDefault()
        history.push("/forget")
    }
    const handleRegisterRedirect = (e) => {
        history.push('/register')
      }

    return (
        <div>
            <div className={styles.reset}>
                <div className={styles.resetWrapper}>
                    <div className={styles.resetLeft}>
                    <img src={logo}></img>
                    <h3 className={styles.resetLogo}>Farmer's Connect</h3>
                        <span className={styles.resetDesc}>
                        Communicate with your fellow farmers on Farmer's Connect!
                        </span>
                    </div>
                    <div className={styles.resetRight}>
                        
                        <form className={styles.resetBox} onSubmit={handleClick}>
                        <span className={styles.resetLabel}>Reset</span>
                            <input 
                                placeholder="Password" 
                                type= "pssword" 
                                minLength="6"
                                required 
                                className={styles.resetInput} 
                                ref={password}
                            />

                            <input 
                                placeholder="confirmPassword" 
                                type= "password" 
                                required 
                                minLength="6"
                                className={styles.resetInput} 
                                ref={confimPassword} 
                            />
                            <button className={styles.resetButton} type="submit" disabled={isFetching}>
                                {isFetching ? "loading" : "Log in"}
                            </button>
                            <span className={styles.resetForgot} onClick={handleForget}>
                                Forgot Password?
                            </span>
                            <button className={styles.resetRegisterButton} onClick={handleRegisterRedirect}>
                                Create a New Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}