import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import { firebase } from "../firebase/firebaseConfig";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { startLoadingNotes } from "../actions/notes";

const AppRouter = () => {

    const dispatch = useDispatch();
    const [isLoggedin, setisLoggedin] = useState(false);

    useEffect(() => {
        // To keep the user logged in even if the page refreshes.
        firebase.auth().onAuthStateChanged( async(user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setisLoggedin(true)
                dispatch(startLoadingNotes(user.uid))
            } else {
                setisLoggedin(false)
            }
        });
        
    }, [dispatch, setisLoggedin]);

    return (
        <Router>

            <div>

                <Switch>

                    <PublicRoute 
                        path="/auth"
                        isAuthenticated={ isLoggedin }
                        component={ AuthRouter }
                    />

                    <PrivateRoute 
                        exact 
                        path="/"
                        isAuthenticated={ isLoggedin }
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />

                </Switch>

            </div>

        </Router>
    )
}

export default AppRouter
