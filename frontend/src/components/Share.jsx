import React, { useContext, useRef, useState } from "react";
import styles from "../styles/share.module.css";
import profilePic from "../assets/blank-profile-picture.png";
import {
    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel,
} from "@material-ui/icons";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import profile from "../assets/profile.png";
import { Button, Modal } from "react-bootstrap";
import { getCurrentUser } from "../services/authService";
import ApiService from "../services/ApiService";
import {
    API_CREATE_POST,
    API_PATH,
    ERR_SERVER_CONNECT,
} from "../constants/ApiConstants";
import SessionStorageService from "../services/SessionStorageService";
import { Axios } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../Action/PostAction";

export default function Share() {
    const user = getCurrentUser();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const Newpost = useSelector((state) => state.Newpost);
    console.log(Newpost);
    console.log("post list is ", Newpost);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (file) {
            console.log("file ", file);
            let form = new FormData();
            form.append("file", file);
            form.append("desc", desc.current.value);
            console.log("desc ", desc.current.value);
            dispatch(createPostAction(form));
            setFile(null);
            handleClose();
        }
    };
    return (
        <div className={styles.share}>
            <div className={styles.shareWrapper}>
                <div className={styles.shareTop}>
                    {/* src=profilePic */}
                    {/* <img src={user.profilePicture ? PF + user.profilePicture : PF + "../assets/profile.png"} alt="" className={styles.shareProfileImg} /> */}
                    <img
                        src={profile}
                        alt=""
                        className={styles.shareProfileImg}
                    />
                    <div className={styles.input_feed}>
                        <input
                            type="button"
                            onClick={handleShow}
                            className={styles.shareInput}
                        />
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <input
                                    type="text"
                                    placeholder={
                                        "Whats happening on campus " +
                                        user.name +
                                        "?"
                                    }
                                    className={styles.shareInput}
                                    ref={desc}
                                />
                                <hr className={styles.shareHr} />
                                {file && (
                                    <div className={styles.shareImgContainer}>
                                        <img
                                            className={styles.shareImg}
                                            src={URL.createObjectURL(file)}
                                            alt=""
                                        />
                                        <Cancel
                                            className={styles.shareCancelImg}
                                            onClick={() => setFile(null)}
                                        />
                                    </div>
                                )}
                                <form
                                    className={styles.shareBottom}
                                    onSubmit={submitHandler}
                                >
                                    <div className={styles.shareOptions}>
                                        <label
                                            htmlFor="file"
                                            className={styles.shareOption}
                                        >
                                            <PermMedia
                                                htmlColor="tomato"
                                                className={styles.shareIcon}
                                            />
                                            <span
                                                className={
                                                    styles.shareOptionText
                                                }
                                            >
                                                Photo or Video
                                            </span>
                                            <input
                                                style={{ display: "none" }}
                                                type="file"
                                                id="file"
                                                accept=".png,.jpeg,.jpg"
                                                onChange={(e) =>
                                                    setFile(e.target.file[0])
                                                }
                                            />
                                        </label>
                                    </div>
                                    <button
                                        className={styles.shareButton}
                                        type="submit"
                                    >
                                        Share
                                    </button>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                <hr className={styles.shareHr} />
                {file && (
                    <div className={styles.shareImgContainer}>
                        <img
                            className={styles.shareImg}
                            src={URL.createObjectURL(file)}
                            alt=""
                        />
                        <Cancel
                            className={styles.shareCancelImg}
                            onClick={() => setFile(null)}
                        />
                    </div>
                )}
                <form className={styles.shareBottom} onSubmit={submitHandler}>
                    <div className={styles.shareOptions}>
                        <label htmlFor="file" className={styles.shareOption}>
                            <PermMedia
                                htmlColor="tomato"
                                className={styles.shareIcon}
                            />
                            <span className={styles.shareOptionText}>
                                Photo or Video
                            </span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                name="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                    </div>
                    <button className={styles.shareButton} type="submit">
                        Share
                    </button>
                </form>
            </div>
        </div>
    );
}
