import React, { useEffect, useState } from "react";
import styles from "../styles/rightbar.module.css";
import birthday from "../assets/presentBirthday.png";
import adOne from "../assets/advertisement.jpg";
import { Users } from "../dummyData.js";
import Online from "./Online.jsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { friendListAction } from "../Action/friendAction";
import Loader from "./Loader";
import Message from "./Message";

// import { Add, Remove } from "@material-ui/icons"
// import { AuthContext } from "../context/AuthContext";

// 'assets/rawData1.jpg'

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch = useDispatch();
    const { friends, loading, error } = useSelector(
        (state) => state.friendList
    );
    console.log("friend List is ", friends);
    // const [friends, setFriends] = useState([]);

    useEffect(() => {
        dispatch(friendListAction());
    }, []);

    const handleClick = async () => {
        // try {
        //     if (followed) {
        //         await axios.put("/users/" + user._id + "/unfollow", {
        //             userId: currentUser._Id,
        //         });
        //         dispatch({ type: "UNFOLLOW", payload: user._id })
        //     } else {
        //         await axios.put("/users/" + user._id + "/follow", {
        //             userId: currentUser._Id,
        //         });
        //         dispatch({ type: "FOLLOW", payload: user._id })
        //     }
        // } catch (err) {
        //     console.log(err)
        // }
        // setFollowed(!followed)
    };

    const HomeRightbar = () => {
        return (
            <>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <>
                        <div className={styles.birthdayContainer}>
                            <img
                                className={styles.birthdayImage}
                                src={birthday}
                                alt=""
                            />
                            <span className={styles.birthdayText}>
                                <b>Tristin</b> and <b>3 other friends</b> have a
                                birthday today
                            </span>
                        </div>

                        <img className={styles.rightbarAd} src={adOne} alt="" />
                        <h4 className={styles.rightbarTitle}>
                            Online Friends:
                        </h4>
                        <ul className={styles.onlineFriendList}>
                            {friends.map((u) => (
                                <Online key={u.id} user={u} />
                            ))}
                        </ul>
                    </>
                )}
            </>
        );
    };
    const ProfileRightbar = () => {
        return (
            <>
                {/* {user.username !== currentUser.username && (
                    <button className="rightbarFollowButton" onClick={handleClick}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove /> : <Add />}
                    </button>
                )} */}
                <h4 className={styles.rightbarTitle}>User information:</h4>
                <div className={styles.rightbarInfo}>
                    <div className={styles.rightbarInfoItem}>
                        <span className={styles.rightbarInfoKey}>City:</span>
                        <span className={styles.rightbarInfoValue}>
                            {user.city}
                        </span>
                    </div>
                    <div className={styles.rightbarInfoItem}>
                        <span className={styles.rightbarInfoKey}>From:</span>
                        <span className={styles.rightbarInfoValue}>
                            {user.from}
                        </span>
                    </div>
                    <div className={styles.rightbarInfoItem}>
                        <span className={styles.rightbarInfoKey}>
                            Relationship:
                        </span>
                        <span className={styles.rightbarInfoValue}>
                            {user.relationship === 1
                                ? "Single"
                                : user.relationship === 1
                                ? "Married"
                                : "-"}
                        </span>
                    </div>
                </div>
                <h4 className={styles.rightbarTitle}>User friends:</h4>
                <div className={styles.rightbarFollowings}>
                    {/* {friends.map((friend) => (
                        <Link
                            to={"/profile/" + friend.username}
                            style={{ textDecoration: "none" }}
                        >
                            <div className={styles.rightbarFollowing}>
                                <img
                                    className={styles.rightbarFollowingImage}
                                    src={
                                        friend.profilePicture
                                            ? PF + friend.profilePicture
                                            : PF + `${PF}rawData1.jpg`
                                    }
                                    alt=""
                                />
                                <span className={styles.rightbarFollowingName}>
                                    {friend.username}
                                </span>
                            </div>
                        </Link>
                    ))} */}
                </div>
            </>
        );
    };
    return (
        <div className={styles.rightbar}>
            <div className={styles.rightbarWrapper}>
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}
