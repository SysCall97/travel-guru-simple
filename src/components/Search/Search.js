import React, { useContext } from 'react';
import { userContext } from '../../App';

const Search = () => {
    const {background} = useContext(userContext);
    const [whiteBg, setWhiteBg] = background;

    setWhiteBg(true);
    return (
        <div>
            This is search.
        </div>
    );
};

export default Search;