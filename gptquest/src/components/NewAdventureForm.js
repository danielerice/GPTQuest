import React, { useContext, useState } from "react";
import { AdventureContext } from "../contexts/AdventureContext";

function NewAdventureForm() {

    const {adventures, setAdventures} = useContext(AdventureContext);
    const [title, setTitle] = useState("");
    const [prompt, setPrompt] = useState("");
    const [description, setDescription] = useState("")

    async function createNewAdventure (event) {
        //this will submit a new quest into db with an assosiated character, update state, send API call to GPT, and redirect user to "ActiveAdventure" comp
        //event.preventDefault();

        const formData = {
            "title": title,
            "description": description,
            "prompt": prompt
            };
          
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(formData)
        };

        const response = await fetch(`/adventures`, configObj);
        const newAdventure = await response.json();

        if (response.status === 201) {
           const updatedAdventures = adventures
           updatedAdventures.push(newAdventure)
           setAdventures(updatedAdventures)
            } else {
            console.log(response.errors)
            }
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
                <label>Description:</label>
                <input className="signin-form-box"
                    type="text"
                    id="description"
                    autoComplete="off"
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                <div className="center"><button className="pixel2" type="submit">Begin</button></div>
            </form>
        </div>
    )
}

export default NewAdventureForm;