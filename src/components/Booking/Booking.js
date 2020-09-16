import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { areas } from '../../areaInfo/areaInfo';

const Booking = () => {
    const data = useParams();
    const { register, errors } = useForm();
    const selectedArea = areas.find(area => area.name === data.name);
    
    localStorage.setItem('booking', JSON.stringify({destination: selectedArea.name}));

    const handleBlur = event => {
        let booking = JSON.parse(localStorage.getItem('booking'));
        booking[event.target.name] = event.target.value;
        localStorage.setItem('booking', JSON.stringify(booking));
    }

    return (
        <div style={{
            margin: "15vh 9vw 0 9vw",
            paddingBottom: "20vh",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between"
        }}>
            <div style={{
                color: "white",
                marginBottom: "10vh",
                width: "30%"
            }}>
                <h3 style={{
                    fontWeight: "400",
                    fontSize: "100px"
                }}>{selectedArea.name}</h3>
                <p>{selectedArea.description}</p>
            </div>

            <form
                style={{
                    width: "25rem",
                    height: "65vh",
                    backgroundColor: "white",
                    color: "gray",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px, solid black",
                    borderRadius: "20px"
                }}>
                <label htmlFor="">Origin</label>
                <input className="input" name="origin" ref={register({ required: true })} onBlur={handleBlur} placeholder="your city" />
                {errors.origin && <span>This field is required</span>}

                <label htmlFor="">Destination</label>
                <input className="input" name="destination" ref={register({ required: true })} defaultValue={selectedArea.name} />
                {errors.destination && <span>This field is required</span>}

                <label htmlFor="">From</label>
                <input className="input" name="from" type="date" ref={register({ required: true })} onBlur={handleBlur} />
                {errors.from && <span>This field is required</span>}

                <label htmlFor="">To</label>
                <input className="input" name="to" type="date" ref={register({ required: true })} onBlur={handleBlur} />
                {errors.to && <span>This field is required</span>}
                <br />
                <Link to={`/search/${selectedArea.name}`}>
                    <input type="submit" className="button" placeholder="Start Booking"/>
                </Link>
            </form>

        </div>
    );
};

export default Booking;