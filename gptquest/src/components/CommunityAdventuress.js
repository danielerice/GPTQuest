import React, { useContext } from "react";
import { AdventureContext } from "../contexts/AdventureContext";
import AdventureCard from "./AdventureCard";

function CommunityAdventures () {

    const {adventures, setAdventures} = useContext(AdventureContext);
    //console.log(adventures.length)

    function createAdventureGrid() {
        const grid = []
        for (let i=0; i < adventures.length; i++) {
            grid.push(
                <div className="row">
                    <div className="col">{adventures[i] ? <AdventureCard key={adventures[i].title} adventure={adventures[i]} />: console.log("nah") }</div>
                    <div className="col">{adventures[i+1] ? <AdventureCard key={adventures[i+1].title} adventure={adventures[i+1]} /> : console.log("nah") }</div>
                </div>)
                i++
        }
        return grid.map((row) => {
            return row
        })
    }
 

    if (adventures.length) {
    return (
        <div className="container">
            {createAdventureGrid()}
        </div>
    )} else {
        return <p>Loading...</p>
    }
}

export default CommunityAdventures;