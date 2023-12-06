import React, { useContext } from "react";
import AdventureCard from "./AdventureCard";
import { UserContext } from "../contexts/UserContext";

function MyAdventures () {
    
    const {user, setUser} = useContext(UserContext);
    
    function createAdventureGrid() {
        const grid = []
        for (let i=0; i < user.adventures.length; i++) {
            grid.push(
                <div key={i} className="row justify-content-center align-content-center">
                    <div className="col-6 gy-5">{user.adventures[i] ? <AdventureCard key={user.adventures[i].title} currAdventure={user.adventures[i]} setUser={setUser} />: <></>}</div>
                    <div className="col-6 gy-5">{user.adventures[i+1] ? <AdventureCard key={user.adventures[i+1].title} currAdventure={user.adventures[i+1]}  setUser={setUser}/> : <></>}</div>
                </div>)
                i++
        }
        return grid.map((row) => {
            return row
        })
    }
 


    return (
        <div className="container-fluid">
            { user.adventures.length < 1 ? <div className="row justify-content-center"><div className="col gy-5"><h2 className="text-center">Oops! Looks like you haven't created any adventures yet. To create an adventure go to the <a class="link-opacity-100" href="/">Home</a> page and fill out the form. Good luck!</h2></div></div> :createAdventureGrid() }
        </div>
    )
}

export default MyAdventures;