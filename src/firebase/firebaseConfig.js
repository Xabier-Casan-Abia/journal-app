import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-auth';

 
const firebaseConfig = {
    apiKey: "AIzaSyBjOsoQwkHYZ446B_LW7QEsV8HmF1j8Q5k",
    authDomain: "react-journal-app-eb463.firebaseapp.com",
    databaseURL: "https://react-journal-app-eb463.firebaseio.com",
    projectId: "react-journal-app-eb463",
    storageBucket: "react-journal-app-eb463.appspot.com",
    messagingSenderId: "126300057104",
    appId: "1:126300057104:web:0ee7587b2028e9d093e495"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}