import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { userContext } from '../../App';
import { emailLogIn, facebookSignIn, googleSignIn, initializeLogInFramework } from '../../firebase/firebase';
import fb from '../../images/Icon/fb.png';
import google from '../../images/Icon/google.png';


const Login = () => {
    initializeLogInFramework();
    const { register, handleSubmit } = useForm();
    const { background } = useContext(userContext);
    const [whiteBg, setWhiteBg] = background;

    setWhiteBg(true);

    const { user } = useContext(userContext);
    const [loggedinUser, setLoggedinUser] = user;
    const [newUserInfo, setNewUserInfo] = useState({});
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const handleLogin = (data, event) => {
        // console.log(firebase.auth().currentUser);
        if (newUserInfo.email && newUserInfo.password) {
            emailLogIn(data.email, data.password)
                .then(user => {
                    setLoggedinUser(user);
                    if (user.loggedIn) {
                        setNewUserInfo({});
                        history.replace(from);
                    }
                })
        } else {
            if (!newUserInfo.email) alert("Please write your email in valid format");
            if (!newUserInfo.password) alert("Please write your password in valid format");
        }
        event.preventDefault();
    }

    const handleGoogleSignIn = () => {
        googleSignIn().then(user => {
            setLoggedinUser(user);
            if (user.loggedIn) {
                setNewUserInfo({});
                history.replace(from);
            }
        })
    }

    const handleFacebookSignIn = () => {
        facebookSignIn().then(user => {
            setLoggedinUser(user);
            if (user.loggedIn) {
                setNewUserInfo({});
                history.replace(from);
            }
        })
    }

    const handleBlur = event => {
        let isFieldValid = true;
        if (event.target.name === "email") {
            const isEmailValid = /\S+@\S+\.\S+/.test(event.target.value);
            isFieldValid = isEmailValid;
            if (!isFieldValid) {
                const UserInfo = { ...newUserInfo };
                UserInfo["emailError"] = "your email is not in right format";
                setNewUserInfo(UserInfo);
            }
        } else if (event.target.name === "password") {
            const isPasswordValid = event.target.value.length > 6 && /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid;
            if (!isFieldValid) {
                const UserInfo = { ...newUserInfo };
                UserInfo["passwordError"] = "password must contain at least one numeric value";
                setNewUserInfo(UserInfo);
            }
        }
        if (isFieldValid) {
            const UserInfo = { ...newUserInfo };
            UserInfo[event.target.name] = event.target.value;
            if(event.target.name === "email") UserInfo["emailError"] = "";
            else if(event.target.name === "password") UserInfo["passwordError"] = "";
            setNewUserInfo(UserInfo);
        }
    }

    return (
        <div className="formPage">
            <div className="formContainer">
                {loggedinUser.error && <p className="errorText">*{loggedinUser.error}</p>}
                <form className="signinForm" onSubmit={handleSubmit(handleLogin)}>
                    <div className="formTitle"><h1>Log in</h1></div><br />

                    {newUserInfo.emailError && <p className="errorText">*{newUserInfo.emailError}</p>}
                    <input className="signInInput" name="email" type="text" placeholder="Email" onBlur={handleBlur} ref={register({ required: true })} /><br />

                    {newUserInfo.passwordError && <p className="errorText">*{newUserInfo.passwordError}</p>}
                    <input className="signInInput" name="password" type="password" placeholder="Password" onBlur={handleBlur} ref={register({ required: true })} /><br />
                    <Link to="/updatePassword" className="createAccount ml-auto"><span style={{cursor: "pointer"}}>Forgot Password</span></Link> <br />

                    <button style={{ width: "100%" }}>Log in</button><br />
                    <p>Don’t have an account? <Link to="/signup"><span className="createAccount">Create an account</span></Link></p>
                </form>
            </div><br />
            <span className="or">OR</span>

            <div className="fireAuth">
                <div className="mr-auto authLogo"> <img
                    src={fb}
                    alt=""
                    width="40"
                /></div>
                <div className="authTitle" onClick={handleFacebookSignIn}><h5>Continue with Facebook</h5></div>
            </div>

            <div className="fireAuth">
                <div className="mr-auto authLogo"> <img
                    src={google}
                    alt=""
                    width="40"
                /></div>
                <div className="authTitle" onClick={handleGoogleSignIn}><h5>Continue with Google</h5></div>
            </div>

        </div>
    );
};

export default Login;