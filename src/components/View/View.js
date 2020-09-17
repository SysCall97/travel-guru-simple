import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { userContext } from '../../App';
import Booking from '../Booking/Booking';
import Home from '../Home/Home';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Search from '../Search/Search';
import TransparentNavbar from '../TransparentNavbar/TransparentNavbar';
import backgroundImg from '../../images/Image/Rectangle_1.png';
import Signup from '../Signup/Signup';

const View = () => {
    const imgBg = {
        background: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7) ), url(${backgroundImg}) no-repeat center center fixed`,
        backgroundSize: "cover"
    }
    const noBg = {
        backgroundColor: "white"
    }
    const { background } = useContext(userContext);
    const [whiteBg, setWhiteBg] = background;
    return (
        <div style={whiteBg ? noBg : imgBg}>
            <BrowserRouter>
                <TransparentNavbar />
                <Switch>

                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route path="/home">
                        <Home />
                    </Route>

                    <Route path="/booking/:name">
                        <Booking />
                    </Route>

                    {/* <PrivateRoute path="/search/:name">
                    <Search />
                </PrivateRoute> */}

                    <Route path="/search/:name">
                        <Search />
                    </Route>

                    <Route path="/login">
                        <Login />
                    </Route>

                    <Route path="/signup">
                        <Signup />
                    </Route>

                    <Route path="*">
                        <NotFound />
                    </Route>

                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default View;