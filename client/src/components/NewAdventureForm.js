import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import ItemGrid from "./ItemGrid";
import {useNavigate} from 'react-router-dom';

function NewAdventureForm() {

    const {user, setUser} = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [prompt, setPrompt] = useState("");
    const [description, setDescription] = useState("");

    //selected state for item card, pass set function to item
    const [selected, setSelected] = useState();

    //link to activeAdventure
    const navigate = useNavigate();
    const linkAdventure = () => navigate('/activeadventure');


    async function createNewAdventure (event) {
        //this will submit a new quest into db with an assosiated character and item, update state, send API call to GPT, and redirect user to "ActiveAdventure" comp
        event.preventDefault();


        const formData = {
            "title": title,
            "description": description,
            "prompt": prompt,
            "item_title": selected.title,
            "context": selected.context
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
           const updatedAdventures = user.adventures
           updatedAdventures.push(newAdventure)
           const updatedUser = user
           updatedUser.adventures = updatedAdventures
           setUser(updatedUser)
            } else {
            console.log(response.errors)
            }

            linkAdventure()

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
                <ItemGrid
                    selected={selected}
                    setSelected={setSelected}
                />
                <div className="center"><button className="pixel2" type="submit">Begin</button></div>
            </form>
        </div>
    )
}

export default NewAdventureForm;