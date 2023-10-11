import React from "react";

function AdventureCard ({adventure}) {

    // console.log(adventure)
    return (
        <div className="adventureCard">
            <p>{adventure.title}</p>
            <p>{adventure.description}</p>
            <p>{adventure.rating}</p>
            <button>Begin</button>
        </div>
    )
}

export default AdventureCard;