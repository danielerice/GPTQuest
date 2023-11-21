import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import ItemGrid from "./ItemGrid";
import {useNavigate} from 'react-router-dom';
import { AdventureContext } from "../contexts/AdventureContext";

function NewAdventureForm() {

    const {user, setUser} = useContext(UserContext);
    const {setAdventure} = useContext(AdventureContext);
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
           setAdventure(newAdventure)
            } else {
            console.log(response.errors)
            }

            linkAdventure()

    }


    return (
        <div className="row">
            <div className="col-6 offset-3">
                <form onSubmit={createNewAdventure}>

                    
                        <label for="title" >Title:</label>
                        <input className="form-control"
                            type="text"
                            id="title"
                            placeholder="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                        

                    
                        <label for="description">Description:</label>
                        <textarea className="form-control"
                            type="text"
                            id="description"
                            placeholder="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            />
                        

                    
                    
                        <label for="prompt">Prompt:</label>
                        <textarea className="form-control"
                            type="text"
                            id="prompt"
                            placeholder="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            />
                        

                    


                    <ItemGrid
                        selected={selected}
                        setSelected={setSelected}
                    />

                    <div className="row">
                        <div className="col-2 offset-5">
                            <button className="btn btn-primary" type="submit">Begin</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default NewAdventureForm;