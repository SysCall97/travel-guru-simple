import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { userContext } from '../../App';
import { initializeLogInFramework, recoverPasswordViaEmail } from '../../firebase/firebase';


const UpdatePassword = () => {
    initializeLogInFramework();
    const { register, handleSubmit } = useForm();
    const { background } = useContext(userContext);
    const [whiteBg, setWhiteBg] = background;

    setWhiteBg(true);

    const [newUserInfo, setNewUserInfo] = useState({});
    const history = useHistory();

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
                alert(`Recovery email has sent to ${data.email}`);
                history.replace('/login');
            }
        });
    }

    return (
        <div className="formPage">
            <div className="formContainer">
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