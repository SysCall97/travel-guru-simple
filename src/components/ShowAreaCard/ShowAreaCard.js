import React from 'react';

const ShowAreaCard = (props) => {
    const { area, setSelectedAreaName, setSelectedAreaDescription, handleSelect } = props;
    if (area.active) {
        setSelectedAreaName(area.name);
        setSelectedAreaDescription(area.description);
    }
    return (
        <>
        {
                !area.active && <img
                    src={area.img}
                    title={area.name}
                    alt={area.name}
                    style={{
                        cursor: "pointer",
                        margin: "3vh 1vw"
                    }}
                    onClick={() => handleSelect(area.name)}
                    width="200"
                />
        }
        {
            area.active && 
            <img
                src={area.img}
                title={area.name}
                alt={area.name}
                style={{ 
                    cursor: "pointer",
                    margin: "3vh 1vw",
                    border: "2px solid yellow",
                    borderRadius: "15px"
                 }}
                width="200"
            />
        }
        </>
    );
};

export default ShowAreaCard;