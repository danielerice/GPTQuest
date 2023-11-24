import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import ItemGrid from "./ItemGrid";
import {useNavigate} from 'react-router-dom';
import { AdventureContext } from "../contexts/AdventureContext";

function NewAdventureForm({setAlert}) {

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
        if(!selected) {
            setAlert("You must select an item to continue")
        } else {

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
           linkAdventure()
            } else {
            setAlert("Adventure variables can't be blank")
            }


}
    }


    return (
        <div className="container justify-content-center align-content-center">
            <div className="row">
                <div class="accordion" id="accordionPanelsStayOpenExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            Step 1: Choose Adventure Variables
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                            <div class="accordion-body">
                                <div className="col-10 offset-1">
                                    <form>
                                        <label for="title" >Title:</label>
                                        <textarea className="form-control"
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
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Step 2: Choose Starting Equipment
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                            <div class="accordion-body">
                            <ItemGrid
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4 offset-4 gy-4">
                    <button style={{marginBottom: "4rem"}} className="bttn" type="button" onClick={(e) => createNewAdventure(e)}>Begin</button>
                </div>
            </div>
      </div>
    )
}

export default NewAdventureForm;