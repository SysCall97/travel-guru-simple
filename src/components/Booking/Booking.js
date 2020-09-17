import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { areas } from '../../areaInfo/areaInfo';

const Booking = () => {
    const data = useParams();
    const { register } = useForm();
    const selectedArea = areas.find(area => area.name === data.name);
    
    localStorage.setItem('booking', JSON.stringify({
        destination: selectedArea.name, 
        lat: selectedArea.lat, 
        lng: selectedArea.lng,
        to: new Date().toISOString(),
        from: new Date().toISOString(),
    }));

    const handleBlur = event => {
        let booking = JSON.parse(localStorage.getItem('booking'));
        booking[event.target.name] = event.target.value;
        localStorage.setItem('booking', JSON.stringify(booking));
    }

    return (
        <div className="bookingContainer">
            <div className="homeLeft">
                <h3 className="homeAreaName">{selectedArea.name}</h3>
                <p>{selectedArea.description}</p>
            </div>

            <form className="bookingForm">

                <label htmlFor="">Origin</label>
                <input className="input" name="origin" ref={register({ required: true })} onBlur={handleBlur} placeholder="your city" required/>

                <label htmlFor="">Destination</label>
                <input className="input" name="destination" ref={register({ required: true })} defaultValue={selectedArea.name} required/>
                
                <label htmlFor="">From</label>
                <input className="input" name="from" type="date" ref={register({ required: true })} onBlur={handleBlur}/>
                
                <label htmlFor="">To</label>
                <input className="input" name="to" type="date" ref={register({ required: true })} onBlur={handleBlur}/>
                <br />
                
                <Link to={`/search/${selectedArea.name.toLowerCase()}`}>
                    <input type="submit" className="button" placeholder="Start Booking"/>
                </Link>
            </form>

        </div>
    );
};

export default Booking;