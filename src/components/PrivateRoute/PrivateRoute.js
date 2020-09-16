import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const {user} = useContext(userContext);
    const [loggedinUser, setLoggedinUser] = user;
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedinUser.loggedIn ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};

export default PrivateRoute;