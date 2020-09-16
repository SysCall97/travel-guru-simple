import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

export const initializeLogInFramework = () => {
    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const googleSignIn = () => {}

export const facebookSignIn = () => {}

export const emailSignIn = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        const newUser = {
            displayName: name,
            email: email,
            loggedIn: true,
            error: ""
        }
        updateUser(name);
        return newUser;
    })
    .catch(error => {
        const newUser = {
            displayName: name,
            email: email,
            loggedIn: false,
            error: error.message
        }
        return newUser;
    })
}

export const emailLogIn = (email, password) => {}

export const signOut = (name, email, password) => {}

export const passwordRecover = (email, password) => {}

const updateUser = (name) => {
    firebase.auth().currentUser.updateProfile({
        displayName: name
    })
}