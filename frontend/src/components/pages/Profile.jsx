import React from "react";
import styles from "../../styles/Profile.module.css";
import Sidebar from "../Sidebar.jsx";
import Topbar from "../Topbar.jsx";
import Feed from "../Feed.jsx";
import Rightbar from "../Rightbar.jsx";
import { useEffect } from "react";
import { useParams } from "react-router";
import { getCurrentUser } from "../../services/authService";
import cover from "../../assets/famr.webp";
import profileimage from "../../assets/profile.png";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
    acceptRequestAction,
    checkFriendAction,
    createRequestAction,
    incomingRequestAction,
    requestStatusAction,
} from "../../Action/friendAction";
import { getUserDetailsAction } from "../../Action/UsersAction";
import Loader from "../Loader";
import Message from "../Message";
import { Divider } from "@material-ui/core";
import { useState } from "react";
import ChatMessage from "../ChatMessage";

// "assets/forest.jpg" was in profile cover image
//"assets/rawData1.jpg" profile user image

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // const [user, setUser] = useState({});
    const params = useParams();
    const dispatch = useDispatch();
    const [messageBox, setmessageBox] = useState(false);
    const namedata = window.location.pathname.split("/")[2];
    const { message, loading: statusLoader } = useSelector(
        (state) => state.requestStatus
    );
    console.log("status is  ", statusLoader);
    console.log("data is ", message);
    const { confirmFriend, loading: checkLoading } = useSelector(
        (state) => state.checkFriend
    );
    console.log("check friend is ", checkLoading);
    const { requests, loading } = useSelector((state) => state.newRequest);
    console.log("request ", loading);
    const {
        user: users,

        error,
    } = useSelector((state) => state.userDetails);

    const user = getCurrentUser;

    const requestHandler = (context) => {
        // console.log(context);
        // e.preventDefault();

        if (context === "accept") {
            dispatch(acceptRequestAction(namedata));
            console.log(context);
        } else if (context === "reject") {
            console.log(context);
        } else {
            console.log("create");
            dispatch(createRequestAction(namedata));
            dispatch(requestStatusAction(namedata));
        }
    };

    const closeMessanger = () => {
        setmessageBox(!messageBox);
        console.log("message called ", messageBox);
    };

    useEffect(() => {
        dispatch(checkFriendAction(namedata));
        dispatch(requestStatusAction(namedata));
        dispatch(getUserDetailsAction(namedata));
    }, [namedata]);

    return (
        <>
            <Topbar />
            <div className={styles.profile}>
                <Sidebar />
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
                        <div className={styles.profileInfo}>
                            <Row>
                                {checkLoading ? (
                                    <Loader />
                                ) : (
                                    confirmFriend !== namedata && (
                                        <Col>
                                            {}
                                            {loading ? (
                                                <Loader />
                                            ) : error ? (
                                                <Message varient="danger">
                                                    {error}
                                                </Message>
                                            ) : requests.status === 2 ? (
                                                <>
                                                    <Button
                                                        variant="dark"
                                                        style={{
                                                            color: "green",
                                                        }}
                                                        onClick={() =>
                                                            requestHandler(
                                                                "accept"
                                                            )
                                                        }
                                                    >
                                                        Accept Request
                                                    </Button>
                                                    <Divider></Divider>
                                                    <span>
                                                        <Button
                                                            variant="dark"
                                                            style={{
                                                                color: "blue",
                                                            }}
                                                            onClick={() =>
                                                                requestHandler(
                                                                    "reject"
                                                                )
                                                            }
                                                        >
                                                            Reject Request
                                                        </Button>
                                                    </span>
                                                </>
                                            ) : statusLoader ? (
                                                <Loader />
                                            ) : message.status === 1 ? (
                                                <Button
                                                    variant="dark"
                                                    className=""
                                                >
                                                    {" "}
                                                    Pending
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="dark"
                                                    className=""
                                                    onClick={requestHandler}
                                                >
                                                    {" "}
                                                    Send Request
                                                </Button>
                                            )}
                                        </Col>
                                    )
                                )}
                                <Col>
                                    {checkLoading ? (
                                        <Loader />
                                    ) : (
                                        confirmFriend === namedata && (
                                            <Button
                                                variant="dark"
                                                className=""
                                                onClick={closeMessanger}
                                            >
                                                <i className="fa-solid fa-messages"></i>{" "}
                                                Message
                                            </Button>
                                        )
                                    )}
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className={styles.profileRightBottom}>
                        {/* {username} */}
                        <Feed username={user.username} />
                        <Rightbar user={user.username} />
                        {messageBox && <ChatMessage closeme={closeMessanger} />}
                    </div>
                </div>
            </div>
        </>
    );
}
