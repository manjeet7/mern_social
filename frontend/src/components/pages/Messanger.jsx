import "../../styles/messanger.css";
import Topbar from "../../components/Topbar";
// import Conversation from "../../components/conversations/Conversation";
import Messager from "../../styles/messanger.css";
// import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import ChatMessage from "../ChatMessage";
import Conversation from "../Conversation";
import ChatOnline from "../ChatOnline";
import SessionStorageService from "../../services/SessionStorageService";
import { useDispatch, useSelector } from "react-redux";
import {
    createConversationAction,
    getConversationAction,
} from "../../Action/chatAction";
import Loader from "../Loader";
import Message from "../Message";
import { friendListAction } from "../../Action/friendAction";

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [user, setUser] = useState({});
    // const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    // const { user } = useContext(AuthContext);
    const scrollRef = useRef();
    const dispatch = useDispatch();
    const {
        loading: convoLoading,
        success,
        conversation,
    } = useSelector((state) => state.conversationData);
    console.log("convo data", conversation);
    const data = useSelector((state) => state.conversationData);
    console.log("data is ", data);
    // useEffect(() => {
    //     socket.current = io("ws://localhost:8900");
    //     socket.current.on("getMessage", (data) => {
    //         setArrivalMessage({
    //             sender: data.senderId,
    //             text: data.text,
    //             createdAt: Date.now(),
    //         });
    //     });
    // }, []);

    // useEffect(() => {
    //     arrivalMessage &&
    //         currentChat?.members.includes(arrivalMessage.sender) &&
    //         setMessages((prev) => [...prev, arrivalMessage]);
    // }, [arrivalMessage, currentChat]);

    // useEffect(() => {
    //     socket.current.emit("addUser", user._id);
    //     socket.current.on("getUsers", (users) => {
    //         setOnlineUsers(
    //             user.followings.filter((f) => users.some((u) => u.userId === f))
    //         );
    //     });
    // }, [user]);

    // useEffect(() => {
    //     const getMessages = async () => {
    //         try {
    //             const res = await axios.get("/messages/" + currentChat?._id);
    //             setMessages(res.data);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     getMessages();
    // }, [currentChat]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const message = {
    //         sender: user._id,
    //         text: newMessage,
    //         conversationId: currentChat._id,
    //     };

    //     const receiverId = currentChat.members.find(
    //         (member) => member !== user._id
    //     );

    //     socket.current.emit("sendMessage", {
    //         senderId: user._id,
    //         receiverId,
    //         text: newMessage,
    //     });

    //     try {
    //         const res = await axios.post("/messages", message);
    //         setMessages([...messages, res.data]);
    //         setNewMessage("");
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    const { friends, loading, error } = useSelector(
        (state) => state.friendList
    );
    console.log("frinds is ", friends);
    // const sendMessage = () => {
    //     dispatch(createConversationAction());
    // };

    useEffect(() => {
        dispatch(friendListAction());
        const getUserdata = async () => {
            const user = await SessionStorageService.getSessionStorage(
                "userData"
            );
            await setUser(user);
            console.log("user data ", user);
        };
        getUserdata();
        console.log("user is ", user);
    }, []);

    useEffect(() => {
        dispatch(getConversationAction(user._id));
    }, []);

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input
                            placeholder="Search for friends"
                            className="chatMenuInput"
                        />
                        {/* {convoLoading ? (
                            <Loader />
                        ) : error ? (
                            <Message varient="danger">error</Message>
                        ) : (
                            conversation.map((c) => (
                                <div onClick={() => setCurrentChat(c)}>
                                    <Conversation
                                        conversation={c}
                                        currentUser={user}
                                    />
                                </div>
                            ))
                        )} */}
                        {/* {conversations.map((c) => (
                            <div onClick={() => setCurrentChat(c)}>
                                <Conversation
                                    conversation={c}
                                    currentUser={user}
                                />
                            </div>
                        ))} */}
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                    </div>
                    menu
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            <ChatMessage />
                            <ChatMessage />
                            <ChatMessage />
                            <ChatMessage />
                            <ChatMessage />
                        </div>
                        {/* {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((m) => (
                                        <div ref={scrollRef}>
                                            <ChatMessage
                                                message={m}
                                                own={m.sender === user._id}
                                            />
                                        </div>
                                    ))}
                                </div> */}
                        <div className="chatBoxBottom">
                            <textarea
                                className="chatMessageInput"
                                placeholder="write something..."
                                onChange={(e) => setNewMessage(e.target.value)}
                                value={newMessage}
                            ></textarea>
                            <button className="chatSubmitButton">Send</button>
                        </div>
                        {/* </> */}
                        {/* // ) : (
                        //     <span className="noConversationText">
                        //         Open a conversation to start a chat.
                        //     </span>
                        // )} */}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <Message varient="danger">{error}</Message>
                        ) : (
                            friends.map((data) => <ChatOnline user={data} />)
                        )}
                        {/* <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline /> */}
                    </div>
                </div>
            </div>
        </>
    );
}
