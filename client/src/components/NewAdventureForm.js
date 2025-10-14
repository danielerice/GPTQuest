import React, { useContext, useState } from "react";
import ItemGrid from "./ItemGrid";
import {useNavigate} from 'react-router-dom';
import { AdventureContext } from "../contexts/AdventureContext";

function NewAdventureForm({setAlert}) {
    const {setAdventure} = useContext(AdventureContext);
    const [title, setTitle] = useState("");
    const [prompt, setPrompt] = useState("");
    const [description, setDescription] = useState("");
    const [selected, setSelected] = useState();
    const navigate = useNavigate();

    function getCsrfToken() {
        const name = 'csrftoken';
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    async function createNewAdventure (event) {
        event.preventDefault();
        
        if(!selected) {
            setAlert("You must select an item to continue");
            return;
        }

        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCsrfToken()
            },
            credentials: 'include',
            body: JSON.stringify({
                title,
                description,
                prompt,
                item_title: selected.title,
                item_context: selected.context
            })
        };

        try {
            const response = await fetch(`/api/adventures/`, configObj);
            const newAdventure = await response.json();

            if (response.ok) {
                setAdventure(newAdventure);
                navigate('/activeadventure');
            } else {
                setAlert(newAdventure.error || "Adventure creation failed");
            }
        } catch (error) {
            setAlert("Error creating adventure");
        }
    }

    return (
        <div className="container justify-content-center align-content-center">
            <div className="row">
                <div className="accordion" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            Step 1: Choose Adventure Variables
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                            <div className="accordion-body">
                                <div className="col-10 offset-1">
                                    <form>
                                        <label htmlFor="title">Title:</label>
                                        <textarea className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                        <label htmlFor="description">Description:</label>
                                        <textarea className="form-control" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                                        <label htmlFor="prompt">Prompt:</label>
                                        <textarea className="form-control" type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} required />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Step 2: Choose Starting Equipment
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                            <div className="accordion-body">
                                <ItemGrid selected={selected} setSelected={setSelected} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4 offset-4 gy-4">
                    <button style={{marginBottom: "4rem"}} className="bttn" type="button" onClick={createNewAdventure}>Begin</button>
                </div>
            </div>
        </div>
    );
}

export default NewAdventureForm;
