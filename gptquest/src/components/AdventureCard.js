import React, { useContext, useState } from "react";
import EditButton from "./bits/EditButton";
import EditForm from "./EditForm";
import { AdventureContext } from "../contexts/AdventureContext";

function AdventureCard ({adventure}) {

    const {adventures, setAdventures} = useContext(AdventureContext)
    const [target, setTarget] = useState(0);
    const [title, setTitle] = useState("");
    const [prompt, setPrompt] = useState("");
    const [description, setDescription] = useState("")
    
    async function patchAdventure() {
        console.log("patch adventure")
    }
    // console.log(adventure)
    
    if (target === adventure.id) {
        return(
            <div className="adventureCard">
            <form onSubmit={patchAdventure}>
                <label>Title:</label>
                <input className="signin-form-box"
                    type="text"
                    id="title"
                    autoComplete="off"
                    placeholder="title"
                    value={adventure.title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                <label>Prompt:</label>
                <input className="signin-form-box"
                    type="text"
                    id="prompt"
                    autoComplete="off"
                    placeholder="prompt"
                    value={adventure.prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    />
                <label>Description:</label>
                <input className="signin-form-box"
                    type="text"
                    id="description"
                    autoComplete="off"
                    placeholder="description"
                    value={adventure.description}
                    onChange={(e) => setPrompt(e.target.value)}
                    />
                <div className="center"><button className="pixel2" type="submit">Submit</button></div>
            </form>
        </div>
        )
    } else {
        return(
            <div className="adventureCard">
                <p>{adventure.title}</p><EditButton adventure={adventure} setTarget={setTarget}/>
                <p>{adventure.description}</p>
                <p>{adventure.rating}</p>
                <button className="pixel2">Begin</button>
            </div>
        )
    }
}
export default AdventureCard;