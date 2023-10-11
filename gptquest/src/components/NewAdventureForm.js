import React, { useContext, useState } from "react";
import { AdventureContext } from "../contexts/AdventureContext";

function NewAdventureForm() {

    const {adventures, setAdventures} = useContext(AdventureContext);
    const [title, setTitle] = useState("");
    const [prompt, setPrompt] = useState("");

    async function createNewAdventure (event) {
        //this will submit a new quest into db, update state, send API call to GPT, and redirect user to "ActiveAdventure" comp
        event.preventDefault();
        console.log(`${title}, has been created with prompt: ${prompt}`)
    }


    return (
        <div>
        <form onSubmit={createNewAdventure}>
            <label>Title:</label>
            <input className="signin-form-box"
                type="text"
                id="title"
                autoComplete="off"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            <label>Prompt:</label>
            <input className="signin-form-box"
                type="text"
                id="prompt"
                autoComplete="off"
                placeholder="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                />
            <label>Confirm Password:</label>
            <div className="center"><button className="pixel2" type="submit">Begin</button></div>
        </form>
    </div>
    )
}

export default NewAdventureForm;