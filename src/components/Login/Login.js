import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import { initializeLogInFramework } from '../../firebase/firebase';
import fb from '../../images/Icon/fb.png';
import google from '../../images/Icon/google.png'

const Login = () => {
    initializeLogInFramework()
    const {background} = useContext(userContext);
    const [whiteBg, setWhiteBg] = background;

    setWhiteBg(true);

    return (
        <div className="formPage">
            <div className="formContainer">
                <form className="signinForm">
                    <div className="formTitle"><h1>Log in</h1></div><br/>
                    <input className="signInInput" type="text" placeholder="Email"/><br/>
                    <input className="signInInput" type="password" name="" id="" placeholder="Password"/><br/>
                    <p className="ml-auto forgotPassword"><Link>Forgot Password?</Link></p>
                    <button style={{width: "100%"}}>Log in</button><br/>
                    <p>Don’t have an account? <Link to="/signup"><span className="createAccount">Create an account</span></Link></p>
                </form>
            </div><br/>
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

export default Login;