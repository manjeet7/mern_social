import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
    createPostReducer,
    getPostReducer,
    postLikeReducer,
} from "./Reducer/PostReducer";
import { getUsersReducer, usersDetailsReducer } from "./Reducer/UserReducer";
import {
    acceptRequesntReducer,
    checkFriendsReducer,
    createRequesntReducer,
    getFollowersReducer,
    getFriendsReducer,
    incomingRequesntReducer,
    requestStatusReducer,
} from "./Reducer/FrienReducer";
import { createConversationReducer } from "./Reducer/chatReducer";

const reducer = combineReducers({
    Newpost: createPostReducer,
    postList: getPostReducer,
    usersList: getUsersReducer,
    userRequest: createRequesntReducer,
    newRequest: incomingRequesntReducer,
    userDetails: usersDetailsReducer,
    followersList: getFollowersReducer,
    acceptRequest: acceptRequesntReducer,
    friendList: getFriendsReducer,
    checkFriend: checkFriendsReducer,
    postLikes: postLikeReducer,
    conversationData: createConversationReducer,
});
const INITIAL_STATE = {
    user: JSON.parse(sessionStorage.getItem("userData")) || null,
    isFetching: false,
    error: false,
};
const middleware = [thunk];

const store = createStore(
    reducer,
    INITIAL_STATE,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
