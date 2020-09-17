import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { userContext } from '../../App';
import { emailLogIn, facebookSignIn, googleSignIn, initializeLogInFramework, recoverPasswordViaEmail } from '../../firebase/firebase';
import fb from '../../images/Icon/fb.png';
import google from '../../images/Icon/google.png';


const UpdatePassword = () => {
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
        }
        if (isFieldValid) {
            const UserInfo = { ...newUserInfo };
            UserInfo[event.target.name] = event.target.value;
            if(event.target.name === "email") UserInfo["emailError"] = "";
            else if(event.target.name === "password") UserInfo["passwordError"] = "";
            setNewUserInfo(UserInfo);
        }
    }

    const handlePasswordRecovery = data => {
        recoverPasswordViaEmail(data.email)
        .then(res => {
            if(res) {
                history.replace('/login');
            }
        });
    }

    return (
        <div className="formPage">
            <div className="formContainer">
                {loggedinUser.error && <p className="errorText">*{loggedinUser.error}</p>}
                <form className="signinForm" onSubmit={handleSubmit(handlePasswordRecovery)}>
                    <div className="formTitle"><h1>Password Recovery</h1></div><br />

                    {newUserInfo.emailError && <p className="errorText">*{newUserInfo.emailError}</p>}
                    <input className="signInInput" name="email" type="text" placeholder="Email" onBlur={handleBlur} ref={register({ required: true })} /><br />

                    <button style={{ width: "100%" }}>Send recovery email</button><br />
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;