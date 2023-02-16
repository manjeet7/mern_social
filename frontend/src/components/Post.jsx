import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/post.module.css";
import { MoreVert } from "@material-ui/icons";
import likeIcon from "../assets/likeIcon.png"; // 14:27 changed into `${PF}likeIcon.png` down, but did not work
import heartIcon from "../assets/heartIcon.png"; // 14:27 changed into `${PF}heartIcon.png` down, but did not work
//import {format} from "timeago.js"
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Collapse from "react-bootstrap/Collapse";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { likePostAction } from "../Action/PostAction";

export default function Post({ post }) {
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const postLikes = useSelector((state) => state.postLikes);
    console.log("post is ", postLikes);
    useEffect(() => {}, [post.userId]);

    const likeHandler = (id) => {
        dispatch(likePostAction(id));
    };
    return (
        <div>
            <div className={styles.post}>
                <div className={styles.postWrapper}>
                    <div className={styles.postTop}>
                        <div className={styles.postTopLeft}>
                            <Link to={`profile/${user.username}`}>
                                <img
                                    className={styles.postProfileImg}
                                    src={post.file.url}
                                    alt=""
                                />
                            </Link>
                            <span className={styles.postUsername}>
                                {post.username}
                            </span>
                            <span className={styles.postDate}>
                                {post.createdAt}
                            </span>
                        </div>
                        <div className={styles.postTopRight}>
                            <MoreVert />
                        </div>
                    </div>
                    <div className={styles.postCenter}>
                        <span className={styles.postText}>{post?.desc}</span>
                        {/* <img className={styles.postImage} src={PF + post.img} alt="" /> */}
                    </div>
                    <div className={styles.postBottom}>
                        <div className={styles.postBottomLeft}>
                            <img
                                className={styles.likeIcon}
                                src={likeIcon}
                                onClick={() => likeHandler(post._id)}
                                alt=""
                            />
                            <img
                                className={styles.likeIcon}
                                src={heartIcon}
                                onClick={() => likeHandler(post._id)}
                                alt=""
                            />
                            <span className={styles.postLikeCounter}>
                                {post.like}people like it
                            </span>
                        </div>
                        <div className={styles.PostBottomRight}>
                            <span
                                onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}
                                className={styles.postCommentText}
                            >
                                comments
                            </span>
                        </div>
                    </div>
                    <Collapse in={open}>
                        <ListGroup>
                            <ListGroup.Item>manjeet</ListGroup.Item>
                            <ListGroup.Item>manjeet</ListGroup.Item>
                            <ListGroup.Item>manjeet</ListGroup.Item>
                            <ListGroup.Item>manjeet</ListGroup.Item>
                        </ListGroup>
                    </Collapse>
                </div>
            </div>
        </div>
    );
}
