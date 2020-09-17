import React, { useContext } from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import { signOut } from '../../firebase/firebase';
import logo from "../../images/Logo.svg";

const TransparentNavbar = () => {
    const handleSearch = (event) => {
        event.preventDefault();
    }

    const {user} = useContext(userContext);
    const [loggedinUser, setLoggedinUser] = user;
    const {background} = useContext(userContext);
    const [whiteBg, setWhiteBg] = background;

    const whiteLogo = {
        filter: "brightness(0) invert(1)"
    }
    const blackLogo = {
        filter: "brightness(1) invert(0)"
    }
    const whiteText = {
        color: "white",
        margin:"0 1vw"
    }
    const blackText = {
        color: "black",
        margin:"0 1vw"
    }

    const handleSignOut = () => {
        signOut().then(user => setLoggedinUser({}));
    }
    return (
        <Navbar bg="transparent" expand="lg">
            <Navbar.Brand>
                <Link to="/">
                    <div style={{
                        marginLeft: "5vw",
                        paddingRight: "6vw"
                    }}>
                    <img
                        style={whiteBg ? blackLogo : whiteLogo}
                        src={logo}
                        alt="logo"
                        width="80"
                        fill="#fff"
                    />
                    </div>
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form inline>
                    <FormControl type="text" placeholder="Search" variant="transparent" className="mr-sm-2" />
                    <Button variant={whiteBg ? "outline-dark" : "outline-light"} onClick={handleSearch}>Search</Button>
                </Form>
                <Nav className="ml-auto">
                    <Nav.Link href="#news" style={whiteBg ? blackText : whiteText}>News</Nav.Link>
                    <Nav.Link href="#destination" style={whiteBg ? blackText : whiteText}>Destination</Nav.Link>
                    <Nav.Link href="#blog" style={whiteBg ? blackText : whiteText}>Blog</Nav.Link>
                    <Nav.Link href="#contact" style={whiteBg ? blackText : whiteText}>Contact</Nav.Link>
                    {
                        loggedinUser.loggedIn ?
                            <button onClick={handleSignOut}>Sign out({loggedinUser.displayName})</button>
                            : <Link to="/login"><button>Log in</button></Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default TransparentNavbar;