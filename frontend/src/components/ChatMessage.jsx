import React from "react";
import "../styles/chatMessage.css";
import profile from "../assets/profile.png";

function ChatMessage({ closeme }) {
    const closeBar = () => {
        closeme();
    };
    return (
        <div className="message">
            <div className="close" onClick={closeme}>
                close
            </div>
            <div className="messageTop">
                <img className="messageImg" src={profile} alt="" />
                <p className="messageText">helo</p>
            </div>
            {/* <div className="messageBottom">{format(message.createdAt)}</div> */}
        </div>
    );
}

export default ChatMessage;
