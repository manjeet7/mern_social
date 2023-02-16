
 import React from 'react';
import styles from "../../styles/forgot.module.css";
import { } from "@material-ui/icons";
import { useRef } from 'react';
import {loginCall} from "../../apiCalls"
import { useHistory } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import  logo   from '../../assets/logo_1.png';

export default function ForgotPassword() {

    const email = useRef();
    const mobile = useRef();
    const history = useHistory()
    
    const {isFetching, error, dispatch} = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault();
        history.push('/reset')
        // loginCall(
        //     { email: email.current.value, mobile: mobile.current.value },
        //     dispatch).then(error => {
        //         if (error)
        //         email.current.setCustomValidity("User Login Failed");
        //     })
    }

    const handleRegisterRedirect = (e) => {
        history.push('/login')
      }

    return (
        <div>
            <div className={styles.forgot}>
                <div className={styles.forgotWrapper}>
                    <div className={styles.forgotLeft}>
                    <img src={logo}></img>
                    <h3 className={styles.forgotLogo}>Farmer's Connect</h3>
                        <span className={styles.forgotDesc}>
                        Communicate with your fellow farmers on Farmer's Connect!
                        </span>
                    </div>
                    <div className={styles.forgotRight}>
                        
                        <form className={styles.forgotBox} onSubmit={handleClick}>
                        <span className={styles.forgotLabel}>Forgot Password</span>
                            <input 
                                placeholder="Email" 
                                type= "email" 
                                required 
                                className={styles.forgotInput} 
                                ref={email}
                            />
                           
                           <input 
                                placeholder="Mobile" 
                                type= "number" 
                                required 
                                minLength='10'
                                maxLength='10'
                                className={styles.forgotInput} 
                                ref={mobile}
                            />
                         
                            <button className={styles.forgotButton} type="submit" disabled={isFetching}>
                                {isFetching ? "loading" : "Reset"}
                            </button>
                            {/* <span className={styles.forgotForgot}>
                                Forgot Password?
                            </span> */}
                            <button className={styles.forgotRegisterButton} onClick={handleRegisterRedirect}>
                                Login to Your Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}