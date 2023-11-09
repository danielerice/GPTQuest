import React, { useContext, useState } from "react";
import EditButton from "./bits/EditButton";
import DeleteButton from "./bits/DeleteButton";
//import EditForm from "./EditForm";
import { AdventureContext } from "../contexts/AdventureContext";
import { UserContext } from "../contexts/UserContext";

function AdventureCard ({adventure}) {

    const {user} = useContext(UserContext);
    const {adventures, setAdventures} = useContext(AdventureContext);
    const [target, setTarget] = useState(0);
    const [title, setTitle] = useState(adventure.title);
    const [prompt, setPrompt] = useState(adventure.prompt);
    const [description, setDescription] = useState(adventure.description)
    
    async function patchAdventure(e) {
        e.preventDefault();
        
        const formData = {
            "title": title,
            "description": description,
            "prompt": prompt
            };
          
        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(formData)
        };

        const response = await fetch(`/adventures/${adventure.id}`, configObj);
        const patchedAdventure = await response.json();

        if (response.status === 200) {
            const updatedAdventures = adventures.map((currAdventure) => {
                if (currAdventure.id === patchedAdventure.id) {
                    console.log("match:", currAdventure, patchedAdventure)
                    currAdventure = patchedAdventure
                    return currAdventure
                } else {return currAdventure}
            })
            setAdventures(updatedAdventures)
        } else {
            console.log(response.errors)
        }

    }
     console.log("for delete button", adventure, user.id )
    
    if (target === adventure.id) {
        return(
            <div className="adventureCard">
                <button onClick={(e) => setTarget(0)}>done</button>
            <form onSubmit={patchAdventure}>
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
                <div className="center"><button className="pixel2" type="submit" onClick={(e) => patchAdventure(e)}>Save</button></div>
            </form>
        </div>
        )
    } else {
        return(
            <div className="adventureCard">
                <p>{adventure.title}</p><EditButton adventure={adventure} setTarget={setTarget}/>{ adventure.originator === user.id ? <DeleteButton  adventure={adventure}/> : <></>}
                <p>{adventure.description}</p>
                <p>{adventure.rating}</p>
                <button className="pixel2">Begin</button>
            </div>
        )
    }
}
export default AdventureCard;