import React, { useContext } from 'react';
import { userContext } from '../../App';
import {hotels} from '../../hotelInfo/hotelInfo'
import HotelCard from '../HotelCard/HotelCard';

const Search = () => {
    const convertDateToFormat = (date) => {
        return `${date.getDate()} ${months[date.getMonth()]}, ${1900+date.getYear()}`;
    }
    const { background } = useContext(userContext);
    const [whiteBg, setWhiteBg] = background;
    setWhiteBg(true);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const booking = JSON.parse(localStorage.getItem('booking'));
    const from = new Date(booking.from);
    const to = new Date(booking.to);
    const fromString = convertDateToFormat(from);
    const toSting = convertDateToFormat(to);
    let key = 0;

    return (
        <div className="searchContainer">
            <div className="hotelContainer">
                <small style={{color:"gray"}}>{fromString} to {toSting}</small>
                <h3>Stay at {booking.destination}</h3>
                {
                    hotels.map(hotel => <HotelCard hotel={hotel} key={++key}/>)
                }
            </div>

            <div className="googleMapContainer">
            </div>
        </div>
    );
};

export default Search;