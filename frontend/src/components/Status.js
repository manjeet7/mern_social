import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    followUserAction,
    getUserDetailsAction,
    unFollowAction,
} from "../Action/UsersAction";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import SessionStorageService from "../services/SessionStorageService";
import { Follow, Unfollow } from "../context/AuthActions";
function Status({ user }) {
    const { dispatch } = useContext(AuthContext);
    // const { user } = useSelector((state) => state.userDetails);

    console.log("username ", user);
    // const [user, setUser] = useState();

    // console.log("user ", user, " id is ", namedata);
    // const [person, setPerson] = useState({});

    const namedata = window.location.pathname.split("/")[2];
    const [followed, setFolllowed] = useState(
        user.following.includes(namedata)
    );
    // user.following.includes(namedata)
    // useEffect(() => {
    //     if (user !== null) {
    //         setFolllowed(user.following.includes(namedata));
    //     } else {
    //         setFolllowed("");
    //     }
    // }, [namedata]);

    const checkFollowers = async () => {
        try {
            const token = await SessionStorageService.getSessionStorage(
                "userAccessToken"
            );
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            console.log("check called");
            if (followed) {
                await axios.post(
                    `http://localhost:3001/api/users/${namedata}/unfollow`,
                    {},
                    config
                );
                console.log("inside check if");

                dispatch({
                    type: "UNFOLLOW",
                    payload: namedata,
                });
            } else {
                await axios.post(
                    `http://localhost:3001/api/users/${namedata}/follow`,
                    {},
                    config
                );
                console.log("inside check else");

                dispatch({
                    type: "FOLLOW",
                    payload: namedata,
                });
            }
            setFolllowed(!followed);
            console.log("follow btn ", followed);
        } catch (error) {}
    };

    return (
        <div>
            <Row>
                <Col>
                    <Button onClick={() => checkFollowers()}>
                        {followed ? "unfollow" : "follow"}
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default Status;
