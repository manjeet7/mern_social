import React from "react";
import styles from "../styles/topbar.module.css";
import { Search, Chat, Notifications, HomeOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";

import { getCurrentUser } from "../services/authService";

import { Badge, Col, NavDropdown, Row } from "react-bootstrap";
import logo from "../assets/logo_1.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incomingRequestAction } from "../Action/friendAction";
import Loader from "./Loader";
import Message from "./Message";
export default function Topbar() {
    const user = getCurrentUser();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch = useDispatch();
    const data = useSelector((state) => state.newRequest);
    console.log("incoming request ", data);
    useEffect(() => {
        dispatch(incomingRequestAction());
    }, []);
    return (
        <>
            {/* {loading ? (
                <Loader />
            ) : error ? (
                <Message varient="danger">{error}</Message>
            ) : ( */}
            <div className={styles.topbarContainer}>
                <div className={styles.topbarLeft}>
                    <img src={logo}></img>
                    <Link to="/home" style={{ textDecoration: "none" }}>
                        <span className={styles.logo}>FarmBook</span>
                    </Link>
                </div>
                <div className={styles.topbarCenter}>
                    <div className={styles.searchBar}>
                        <Search className={styles.searchIcon} />
                        <input
                            placeholder="Search for your fellow matadors!"
                            className={styles.searchInput}
                        />
                    </div>
                </div>
                <div className={styles.topbarRight}>
                    <div className={styles.topbarLink}>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <span className={styles.topbarLink}>
                                <HomeOutlined />
                            </span>
                        </Link>
                        {/* <Link to={`/timeline/${user.name}`} style={{ textDecoration: "none" }}>
                        <span className={styles.topbarLink}>Timeline</span>
                    </Link> */}
                    </div>

                    <div className={styles.topbarIcons}>
                        <div className={styles.topbarIconItem}>
                            {/* <Link to={`/profile/${user.name}`} style={{ textDecoration: "none" }}>
                            <Person />
                            <span className={styles.topbarIconBadge}></span>
                        </Link> */}
                            <NavDropdown
                                title={
                                    <span>
                                        <i className="fas fa-user"></i>
                                    </span>
                                }
                                id="collasible-nav-dropdown"
                            >
                                <NavDropdown.Item href="#action/3.1">
                                    <Link to="/profile">Profile</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                    <Link to="/logout">Logout</Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                        <div className={styles.topbarIconItem}>
                            <Chat />
                            <span className={styles.topbarIconBadge}></span>
                        </div>
                        <div className={styles.topbarIconItem}>
                            <span className={styles.topbarIconBadge}></span>
                            <NavDropdown
                                title={
                                    <span>
                                        <Notifications />
                                        <Badge bg="secondary">1</Badge>
                                    </span>
                                }
                                id="collasible-nav-dropdown"
                            >
                                <NavDropdown.Item href="#action/3.1">
                                    <Row>
                                        <Col>
                                            <img
                                                src={logo}
                                                className={styles.topbarImg}
                                            ></img>{" "}
                                            <span>new request</span>{" "}
                                            <span>
                                                {/* <Link
                                                    to={`/profile/${requests.id}`}
                                                >
                                                    view profile
                                                </Link> */}
                                            </span>
                                        </Col>
                                    </Row>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </div>
                    {/* <Link to={`/profile/${user.name}`} style={{ textDecoration: "none" }}>
                    <img alt="" className={styles.topbarImg} />
                    <img src={profile} alt="" className={styles.topbarImg} />
                </Link> */}
                </div>
            </div>
            {/* )} */}
        </>
    );
}
