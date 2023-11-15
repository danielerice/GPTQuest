import React from "react";
import NewAdventureForm from "./NewAdventureForm";

function Home() {

    return (
        <div className="container">
            <div className="p-3 mb-2 bg-light text-dark">
                <h1 className="">Welcome to GPTQuest!</h1>
                <p>Here you can begin your adventures with any prompt and pick from one of three items</p>
            </div>
            <div className="container">
                <NewAdventureForm/>
            </div>
        </div>
    )
}
export default Home;