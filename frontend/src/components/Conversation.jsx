import React from "react";
import profile from "../assets/profile.png";
import "../styles/conversations.css";

function Conversation() {
    return (
        <div className="conversation">
            <img className="conversationImg" src={profile} alt="" />
            <span className="conversationName">jogn doe</span>
        </div>
    );
}

export default Conversation;
