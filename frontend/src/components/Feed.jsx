import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/feed.module.css";
import Share from "./Share.jsx";
import Post from "./Post.jsx";
import { getCurrentUser } from "../services/authService";

import { useDispatch, useSelector } from "react-redux";
import { getPostAction } from "../Action/PostAction";
import Loader from "./Loader";
import Message from "./Message";
// import { Posts } from "../dummyData.js";

export default function Feed() {
    const [newposts, setnewPosts] = useState([]);
    //  const [text,setText] = useState("");
    const dispatch = useDispatch();
    const username = "manjeet";
    const user = getCurrentUser();
    const { posts, loading, error } = useSelector((state) => state.postList);
    const { success } = useSelector((state) => state.Newpost);
    // console.log("new posts are ", posts, loading);
    useEffect(() => {
        const fetchPosts = async () => {
            dispatch(getPostAction());
        };
        fetchPosts();
    }, [dispatch, success]);

    return (
        <div className={styles.feed}>
            <div className={styles.feedWrapper}>
                {(!username || username === user.name) && <Share />}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message varient="danger">{error}</Message>
                ) : (
                    posts.map((p) => <Post key={p._id} post={p} />)
                )}

                {/* {posts.map((data) => (
                    <li>
                        <img src={data.file} />
                    </li>
                ))} */}
            </div>
        </div>
    );
}
