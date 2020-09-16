import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { userContext } from '../../App';
import { emailSignIn, initializeLogInFramework } from '../../firebase/firebase';
import fb from '../../images/Icon/fb.png';
import google from '../../images/Icon/google.png';
import { useForm } from "react-hook-form";

const Signup = () => {
    initializeLogInFramework();
    const { register, handleSubmit } = useForm();
    const { background } = useContext(userContext);
    const [whiteBg, setWhiteBg] = background;
    const { user } = useContext(userContext);
    const [loggedinUser, setLoggedinUser] = user;
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    setWhiteBg(true);

    const handleCreateAccount = (data, event) => {
        if (data.password === data.confirmedPassword) {
            const name = `${data.firstName} ${data.lastName}`;
            emailSignIn(name, data.email, data.password)
                .then(user => {
                    setLoggedinUser(user);
                    console.log(user);
                    if (user.loggedIn) history.replace(from);
            })
        } else {
            alert("Password and confirmed password must be same");
        }
        event.preventDefault();
    }

    return (
        <div className="formPage">
            <div className="formContainer">
                <form className="signinForm" onSubmit={handleSubmit(handleCreateAccount)}>
                    <div className="formTitle"><h1>Sign up</h1></div><br />
                    <input className="signInInput" name="firstName" type="text" placeholder="First Name" ref={register({ required: true })} /><br />
                    <input className="signInInput" name="lastName" type="text" placeholder="Last Name" ref={register({ required: true })} /><br />
                    <input className="signInInput" name="email" type="text" placeholder="Email" ref={register({ required: true })} /><br />
                    <input className="signInInput" name="password" type="password" placeholder="Password" ref={register({ required: true })} /><br />
                    <input className="signInInput" name="confirmedPassword" type="password" placeholder="Confirm Password" ref={register({ required: true })} /><br />

                    <button style={{ width: "100%" }}>Create an account</button><br />
                    <p>Already have an account? <Link to="/login"><span className="createAccount">Log in</span></Link></p>
                </form>
            </div><br />
            <span className="or">OR</span>

            <div className="fireAuth">
                <div className="mr-auto authLogo"> <img
                    src={fb}
                    alt=""
                    width="40"
                /></div>
                <div className="authTitle"><h5>Continue with Facebook</h5></div>
            </div>

            <div className="fireAuth">
                <div className="mr-auto authLogo"> <img
                    src={google}
                    alt=""
                    width="40"
                /></div>
                <div className="authTitle"><h5>Continue with Google</h5></div>
            </div>

        </div>
    );
};

export default Signup;