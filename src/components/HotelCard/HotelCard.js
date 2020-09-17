import React from 'react';
import star_1 from '../../images/Icon/star_1_.png';

const HotelCard = (props) => {
    const hotel = props.hotel
    return (
        <div className="card mb-3">
            <div className="row no-gutters">

                <div className="col-md-6" style={{display:"flex", alignItems:"center"}}>
                    <img src={hotel.img} className="card-img" height="100%" alt="" />
                </div>

                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">{hotel.name}</h5>
                        <p className="card-text" style={{color: "gray"}}>{hotel.description}</p>
                        {
                            hotel.features.map(feature => <p className="card-text" style={{color: "gray"}}>{feature}</p>)
                        }
                        <p className="card-text hotelCardText">
                            <img src={star_1} alt="" height="20" />
                            <span className="hotelRating">{hotel.rating}({hotel.reviewer})</span>
                            <h5 style={{fontWeight:"500", marginLeft: "3vw"}}>{hotel.cost}/<small style={{color: "gray"}}>night</small></h5>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HotelCard;