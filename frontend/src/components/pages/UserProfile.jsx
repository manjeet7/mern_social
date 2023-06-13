import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    followUserAction,
    getUserDetailsAction,
    unFollowAction,
} from "../../Action/UsersAction";
import styles from "../../styles/Profile.module.css";
import Sidebar from "../Sidebar.jsx";
import Topbar from "../Topbar.jsx";
import Feed from "../Feed.jsx";
import Rightbar from "../Rightbar.jsx";
import { getCurrentUser } from "../../services/authService";
import cover from "../../assets/famr.webp";
import profileimage from "../../assets/profile.png";
import { Button, Col, Row } from "react-bootstrap";
import SessionStorageService from "../../services/SessionStorageService";
import Loader from "../Loader";
import Message from "../Message";
import { getFollowers } from "../../api/userRequest";
import { getFollowersAction } from "../../Action/friendAction";
import Status from "../Status";
import { AuthContext, AuthContextProvider } from "../../context/AuthContext";

const UserProfile = () => {
    // const { user } = useSelector((state) => state.userDetails);
    const { id, loading, error } = useSelector((state) => state.followersList);
    const { user } = useContext(AuthContext);
    const namedata = window.location.pathname.split("/")[2];

    const dispatch = useDispatch();

    useEffect(() => {
        const call = () => {
            dispatch(getFollowersAction(namedata));
        };
        call();
    }, [dispatch]);

    const checkFollowers = () => {
        dispatch(unFollowAction(user._id));
    };

    return (
        <>
            <Topbar />
            <div className={styles.profile}>
                <div className={styles.profileRight}>
                    <div className={styles.profileRightTop}>
                        <div className={styles.profileCover}>
                            <img
                                className={styles.profileCoverImage}
                                src={cover}
                                alt=""
                            />
                            <img
                                className={styles.profileUserImage}
                                src={profileimage}
                                alt=""
                            />
                        </div>
                        <div className={styles.profileInfo}></div>
                    </div>
                    <div className={styles.profileRightBottom}>
                        <Status user={user} />

                        <Feed />
                        <Rightbar />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
