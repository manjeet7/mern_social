import React, { useEffect, useLayoutEffect } from "react";
import styles from "../styles/sidebar.module.css";
import {
    RssFeed,
    Chat,
    Videocam,
    Group,
    Bookmark,
    HelpOutline,
    Work,
    Event,
    School,
} from "@material-ui/icons";
import { Users } from "../dummyData.js";
import CloseFriends from "./CloseFriend.jsx";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../services/authService";

import { getUsersAction } from "../Action/UsersAction";
import Loader from "./Loader";
import Message from "./Message";

export default function Sidebar() {
    const dispatch = useDispatch();
    const username = "manjeet";
    const user = getCurrentUser();
    const { users, loading, error } = useSelector((state) => state.usersList);
    const { success } = useSelector((state) => state.Newpost);
    console.log("new users are ", users);
    useEffect(() => {
        const fetchPosts = async () => {
            dispatch(getUsersAction());
        };
        fetchPosts();
    }, [dispatch, success]);

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarWrapper}>
                {/* <ul className={styles.sidebarList}> */}
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <RssFeed className={styles.sidebarIcon} />
                        <span className={styles.sidebarListItemText}>
                            <a
                                href="twitter.com"
                                style={{ textDecoration: "none" }}
                            >
                                Twitter
                            </a>
                        </span>
                    </ListGroup.Item>
                    {/* <li className={styles.sidebarListItem}>

                    </li> */}
                    <ListGroup.Item>
                        <Chat className={styles.sidebarIcon} />
                        <span className={styles.sidebarListItemText}>
                            <a
                                href="facebook.com"
                                style={{ textDecoration: "none" }}
                            >
                                Facebook
                            </a>
                        </span>
                    </ListGroup.Item>
                    {/* <li className={styles.sidebarListItem}>

                    </li> */}
                    <ListGroup.Item>
                        <Videocam className={styles.sidebarIcon} />
                        <span className={styles.sidebarListItemText}>
                            <a
                                href="youtube.com"
                                style={{ textDecoration: "none" }}
                            >
                                Youtube
                            </a>
                        </span>
                    </ListGroup.Item>
                    {/* <li className={styles.sidebarListItem}>

                    </li> */}
                    {/* <li className={styles.sidebarListItem}>
                        <Group className={styles.sidebarIcon} />
                        <span className={styles.sidebarListItemText}><a href="github.com" style={{ textDecoration: "none" }}>Github</a></span>
                    </li>
                    <li className={styles.sidebarListItem}>
                        <HelpOutline className={styles.sidebarIcon} />
                        <span className={styles.sidebarListItemText}><a href="stackoverflow.com" style={{ textDecoration: "none" }}>Questions</a></span>
                    </li>
                    <li className={styles.sidebarListItem}>
                        <Work className={styles.sidebarIcon} />
                        <span className={styles.sidebarListItemText}><a href="linkedin.com" style={{ textDecoration: "none" }}>Jobs</a></span>
                    </li>
                    <li className={styles.sidebarListItem}>
                        <Event className={styles.sidebarIcon} />
                        <span className={styles.sidebarListItemText}><a href="https://www.csun.edu/admissions-records/student-academic-calendar" style={{ textDecoration: "none" }}>Events</a></span>
                    </li>
                    <li className={styles.sidebarListItem}>
                        <School className={styles.sidebarIcon} />
                        <span className={styles.sidebarListItemText}><a href="csun.edu/class-search" style={{ textDecoration: "none" }}>Courses</a></span>
                    </li> */}
                </ListGroup>

                {/* </ul> */}
                <hr className={styles.sidebarHR} />
                <b>People You may Know</b>
                <ul className={styles.sidebarFriendList}>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message varient="danger">{error}</Message>
                    ) : (
                        users.map((u) => <CloseFriends key={u.id} user={u} />)
                    )}
                </ul>
            </div>
        </div>
    );
}
