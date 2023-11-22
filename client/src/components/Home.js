import React from "react";
import NewAdventureForm from "./NewAdventureForm";
import Logo from "./bits/Logo";

function Home() {

    return (
        <div className="container">
            <div className="row">
                <div className="col-6 offset-3">
                    <h1 className="display-1"><Logo fontSize={95}/></h1>{/* Make this a splashy logo */}
                    <p style={{color: "white"}}>Here you can begin your adventures with any prompt and pick from one of three items</p>
                </div>
            </div>
            <div className="container">
                <NewAdventureForm/>
            </div>
        </div>
    )
}
export default Home;