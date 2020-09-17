import React from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

const ShowMap = (props) => {
    const mapStyles = {
        border:"1px solid red",
        minWidth: '250px',
        maxWidth: "350px",
        height: '85%',
        borderRadius: "20px"
      };


    return (
        
            <Map
            google={props.google}
            zoom={11}
            style={mapStyles}
            initialCenter={{ lat: props.lat, lng: props.lng}}
            >
            <Marker position={{ lat: props.lat, lng: props.lng}} />
            </Map>
        
    );
};

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCKMYg-XMg2aRgjmRIG3sCTLqLTemOwZFE")
  })(ShowMap)