import React, { useContext, useState } from "react";
import Sidebar from "../Sidebar.jsx";
import Topbar from "../Topbar.jsx";
import Feed from "../Feed.jsx";
import Rightbar from "../Rightbar.jsx";
import styles from "../../styles/Home.module.css";
import { Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import SessionStorageService from "../../services/SessionStorageService.js";
import { AuthContext } from "../../context/AuthContext.js";
import { getUserDetailsAction } from "../../Action/UsersAction.js";
import { useDispatch } from "react-redux";

export default function Home() {
    return (
        <>
            <Topbar />

            <div className={styles.homeContainer}>
                <Sidebar />
                <Feed />
                <Rightbar />
            </div>
            <h1>hello</h1>
        </>
    );
}
