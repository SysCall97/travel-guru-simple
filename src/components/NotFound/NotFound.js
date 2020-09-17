import React, { useContext } from 'react';
import { userContext } from '../../App';

const NotFound = () => {
    const {background} = useContext(userContext);
    const [whiteBg, setWhiteBg] = background;
    setWhiteBg(false);
    return (
        <div className="notFound">
            <h1>404: Page Not Found</h1>
        </div>
    );
};

export default NotFound;