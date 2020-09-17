import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

export const initializeLogInFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(res => {
            console.log(res);
            const newUser = {
                displayName: res.user.displayName,
                email: res.user.email,
                loggedIn: true,
                error: ""
            }
            return newUser;
        })
        .catch(error => {
            const newUserInfo = {
                loggedIn: false,
                error: error.message,
            };
            newUserInfo.isLoggedIn = false;
            return newUserInfo;
        });
}

export const facebookSignIn = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(res => {
            console.log(res);
            const newUser = {
                displayName: res.user.displayName,
                email: res.user.email,
                loggedIn: true,
                error: ""
            }
            return newUser;
        })
        .catch(error => {
            const newUserInfo = {
                loggedIn: false,
                error: error.message,
            };
            newUserInfo.isLoggedIn = false;
            return newUserInfo;
        });
}

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

export const emailLogIn = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const user = firebase.auth().currentUser;
            const newUser = {
                displayName: user.displayName,
                email: user.email,
                loggedIn: true,
                error: ""
            }
            return newUser;
        })
        .catch(error => {
            const newUser = {
                error: error.message
            }
            return newUser;
        })
}

export const signOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            return {};
        })
}

export const recoverPasswordViaEmail = (email) => {
    return firebase.auth().sendPasswordResetEmail(email)
    .then(res => {
        return true;
    }).catch(error => {
        alert(error.message);
    });
}

const updateUser = (name) => {
    firebase.auth().currentUser.updateProfile({
        displayName: name
    })
}