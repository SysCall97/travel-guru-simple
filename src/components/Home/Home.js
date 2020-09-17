import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import { areas } from '../../areaInfo/areaInfo';
import ShowAreaCard from '../ShowAreaCard/ShowAreaCard';

const Home = () => {
    const [selectedAreaName, setSelectedAreaName] = useState("");
    const [selectedAreaDescription, setSelectedAreaDescription] = useState("");
    const {background} = useContext(userContext);
    const [whiteBg, setWhiteBg] = background;

    setWhiteBg(false);
    let key = 0;

    const [areaInfo, setAreaInfo] = useState(areas);

    const handleSelect = (name) => {
        const selectedArea = areaInfo.find(area => area.name === name);
        
        const newAreaInfo = areaInfo.map(area => {
            if(area.name === name) area.active = true;
            else area.active = false;
            return area;
        });

        setAreaInfo(newAreaInfo);
        
        setSelectedAreaName(selectedArea.name);
        setSelectedAreaDescription(selectedArea.description);
    }

    return (
        <div className="homeContainer">
            <div className="homeLeft">
                <h3 className="homeAreaName"> {selectedAreaName} </h3>
                <p>{selectedAreaDescription}</p>
                <Link to={`booking/${selectedAreaName}`}>
                    <button>Booking</button>
                </Link>
            </div>
            <div>
                {
                    areaInfo.map(area => <ShowAreaCard 
                        area={area}
                        handleSelect = {handleSelect}
                        setSelectedAreaName = {setSelectedAreaName}
                        setSelectedAreaDescription = {setSelectedAreaDescription}
                        key = {++key}
                    />)
                }
            </div>
            
        </div>
    );
};

export default Home;