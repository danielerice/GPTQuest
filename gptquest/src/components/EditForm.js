import React, {useContext, useState} from "react";
import { AdventureContext } from "../contexts/AdventureContext";

function EditForm({adventure}) {
    
    const {adventures, setAdventures} = useContext(AdventureContext);
    const [title, setTitle] = useState("");
    const [prompt, setPrompt] = useState("");
    const [description, setDescription] = useState("")
    
    async function patchAdventure() {
        console.log("patch adventure")
    }
    
    
    if (adventure){
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
    )}
}

export default EditForm;