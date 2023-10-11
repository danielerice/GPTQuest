import React, { useContext } from "react";
import AdventureCard from "./AdventureCard";
import { UserContext } from "../contexts/UserContext";

function MyAdventures ({}) {
    
    const {user, setUser} = useContext(UserContext);
    // console.log(user)
    
    return (
        <div>
            {user.adventures.map((adventure) => 
                <AdventureCard
                key={adventure}
                adventure={adventure}
                />
                )}
        </div>
    )
}

export default MyAdventures;