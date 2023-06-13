import Home from "./components/pages/Home.jsx";
import Login from "./components/pages/Login.jsx";
import Profile from "./components/pages/Profile.jsx";
import Register from "./components/pages/Register.jsx";
import { useEffect, useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./components/pages/Chat.jsx";
import SessionStorageService from "./services/SessionStorageService.js";
import UserProfile from "./components/pages/UserProfile.jsx";
import { AuthContextProvider } from "./context/AuthContext";
function App() {
    // const { user } = getCurrentUser();
    const { user } = true;
    const [userAvailable, setUserAvailable] = useState(false);

    useEffect(() => {
        console.log("App.js");

        SessionStorageService.getSessionStorage("userData").then(
            (response) => {
                console.log("User information", response);

                if (response) {
                    console.log(response);
                    setUserAvailable(true);
                } else {
                    setUserAvailable(false);
                    console.log(false);
                }
            },
            (error) => {
                console.log("Unable to get user info from storage", error);
            }
        );
    }, []);
    console.log("user available ", userAvailable);
    return (
        // <AuthContextProvider>
        <Router>
            <Switch>
                <Route path="/profile">
                    <UserProfile />
                </Route>
                <Route path="/profile/:userId" component={UserProfile} />

                <Route path="/login">{<Login />}</Route>
                <Route exact path="/">
                    {<Register />}
                </Route>
                {/* <Route path="/forget">
                    {userAvailable ? (
                        <Redirect to="/home" />
                    ) : (
                        <ForgotPassword />
                    )}
                </Route> */}
                {/* <Route path="/reset">
                    {userAvailable ? <Redirect to="/" /> : <Reset />}
                </Route> */}
                <Route path="/home">
                    {userAvailable === true ? <Home /> : <Register />}
                </Route>
                <Route path="/messanger">
                    {userAvailable === true ? <Chat /> : <Register />}
                </Route>
            </Switch>
        </Router>
        // </AuthContextProvider>
    );
}

export default App;
