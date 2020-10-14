import Swal from 'sweetalert2'
import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";
import { finishLoading, startLoading } from "./ui";
import { noteLogout } from './notes';

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const logout = () => ({
    type: types.logout
});

export const loginEmailPassword = (email, password) => {
    return (dispatch) => {  

        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.id, user.displayName));
                dispatch(finishLoading());
            })
            .catch(err => {
                console.log(err);
                dispatch(finishLoading());
                Swal.fire("Error", err.message, "error");
            })

    }
};


export const registerNameEmailPassword = (name, email, password) => {
    return (dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async({ user }) => {
                await user.updateProfile({ displayName: name });
                dispatch(login(user.uid, user.displayName));
            })
            .catch(err => {
                console.log(err);
                Swal.fire("Error", err.message, "error");
            })

    }
};

export const googlelogin = () => {
    return (dispatch) => {
    
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then( ({ user }) => {
                console.log(user)
                dispatch(login(user.uid, user.displayName));
            })

    }
};

export const logoutUser = () => {
    return (dispatch) => {
        firebase.auth().signOut()
        .then( resp => {
            dispatch(logout());
            dispatch(noteLogout());
        })
    }
};