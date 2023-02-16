import React from "react";
import styles from "../styles/closefriend.module.css";
import {} from "@material-ui/icons";
import { Link } from "react-router-dom";
import profile from "../assets/profile.png";
import { ListGroup } from "react-bootstrap";

export default function Closefriend({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    console.log("user is ", user._id);
    return (
        <ListGroup>
            <ListGroup.Item>
                <Link to={`/profile/${user._id}`}>
                    <img
                        className={styles.sidebarFriendImg}
                        src={profile}
                        alt=""
                    />
                    <span className={styles.sidebarFriendName}>
                        {user.username}
                    </span>
                </Link>
            </ListGroup.Item>
        </ListGroup>
    );
}
