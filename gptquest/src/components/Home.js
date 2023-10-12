import React, {useContext} from "react";
//import { AdventureContext } from "../contexts/AdventureContext";
//import AdventureCard from "./AdventureCard";
import CommunityAdventures from "./CommunityAdventuress";
import NewAdventureForm from "./NewAdventureForm";

function Home() {

    //const {adventures, setAdventures} = useContext(AdventureContext);
    // console.log(adventures)



    return (
        <div className="home">
            <div className="container">
                <NewAdventureForm/>
            </div>
            <div className="container">
                <CommunityAdventures/>
            </div>
        </div>
    )
}
export default Home;