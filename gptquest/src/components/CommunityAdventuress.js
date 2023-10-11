import React, { useContext } from "react";
import { AdventureContext } from "../contexts/AdventureContext";
import AdventureCard from "./AdventureCard";

function CommunityAdventures () {

    const {adventures, setAdventures} = useContext(AdventureContext);


    return (
        <div>
            {adventures.map(adventure => {
                // console.log(adventure)
                return(
                    <AdventureCard
                        key={adventure.title}
                        adventure={adventure}
                    />
                )
            })}
        </div>
    )
}

export default CommunityAdventures;