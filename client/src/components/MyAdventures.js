import React, { useContext } from "react";
import AdventureCard from "./AdventureCard";
import { UserContext } from "../contexts/UserContext";

function MyAdventures ({}) {
    
    const {user, setUser} = useContext(UserContext);
    
    function createAdventureGrid() {
        const grid = []
        for (let i=0; i < user.adventures.length; i++) {
            grid.push(
                <div className="d-flex justify-content-center">
                    <div className="col">{user.adventures[i] ? <AdventureCard key={user.adventures[i].title} adventure={user.adventures[i]} setUser={setUser} />: console.log("nah") }</div>
                    <div className="col">{user.adventures[i+1] ? <AdventureCard key={user.adventures[i+1].title} adventure={user.adventures[i+1]}  setUser={setUser}/> : console.log("nah") }</div>
                </div>)
                i++
        }
        return grid.map((row) => {
            return row
        })
    }
 


    return (
        <div>
            {createAdventureGrid()}
        </div>
    )
}

export default MyAdventures;