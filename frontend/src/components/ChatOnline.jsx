import React, { useState } from "react";
import "../styles/chatOnline.css";
import profile from "../assets/profile.png";

function ChatOnline(user) {
    console.log("user is ", user.user.username);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const handleClick = async (user) => {
        // try {
        //   const res = await axios.get(
        //     `/conversations/find/${currentId}/${user._id}`
        //   );
        //   setCurrentChat(res.data);
        // } catch (err) {
        //   console.log(err);
        // }
    };
    return (
        <div className="chatOnline">
            {/* {onlineFriends.map((o) => (
                <div
                    className="chatOnlineFriend"
                    onClick={() => handleClick(o)}
                > */}
            <div className="chatOnlineImgContainer">
                <img className="chatOnlineImg" src={profile} />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{user.user.username}</span>
            {/* </div> */}
            {/* // ))} */}
        </div>
    );
}

export default ChatOnline;
