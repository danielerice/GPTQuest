import React, { useContext, useState } from "react";
import EditButton from "./bits/EditButton";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { AdventureContext } from "../contexts/AdventureContext";

function AdventureCard ({ currAdventure }) {

    //link to myAdventures
    const navigate = useNavigate();
    const linkAdventure = () => navigate('/activeadventure');

    const {adventure, setAdventure} = useContext(AdventureContext);
    const {user, setUser} = useContext(UserContext);
    const [target, setTarget] = useState(0);
    const [title, setTitle] = useState(currAdventure.title);
    const [prompt, setPrompt] = useState(currAdventure.prompt);
    const [description, setDescription] = useState(currAdventure.description)
    const [alert, setAlert] = useState(null)
    
    async function startAdventure (event) {
        event.preventDefault();

        //need to add in functionality for item

        setAdventure(currAdventure)
        linkAdventure()

    }
    
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

        const response = await fetch(`/adventures/${currAdventure.id}`, configObj);
        const patchedAdventure = await response.json();

        if (response.status === 200) {
            const updatedAdventures = user.adventures.map((curAdventure) => {
                if (curAdventure.id === patchedAdventure.id) {
                    curAdventure = patchedAdventure
                    return curAdventure
                } else {return curAdventure}
            })
            const updatedUser = user
            updatedUser.adventures = updatedAdventures
            setUser({...updatedUser})
            setAdventure({...patchedAdventure})
        } else {
            setAlert("Adventure varibles can't be blank")
        }

    }

    function deleteAdventure () {
        //deletes adventure when clicked
        console.log("click")
        const response = fetch(`/adventures/${currAdventure.id}`, { method: 'DELETE' });
        const updatedAdventures = user.adventures.filter((curr) => curr.id !== currAdventure.id );
        const updatedUser = user
        updatedUser.adventures = updatedAdventures
        setUser({...updatedUser});
    }

    
    if (target === currAdventure.id) {
        return(
            <div className="card">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <div className="btn-group">
                        <button className="btn btn-outline-primary btn-sm" type="submit" onClick={(e) => patchAdventure(e)}>Save</button>
                        <button className="btn btn-outline-primary btn-sm" onClick={(e) => setTarget(0)}>done</button>
                    </div>
                </div>
                <div className="card-body">
                {alert ? <div class='alert alert-danger alert-dismissible fade show' role="alert">{alert}<button type="button" class="btn-close" onClick={(e) => setAlert(null)} ></button></div> : <></> }
                <h2 class="card-header">
                    {currAdventure.title}
                </h2>
                <form onSubmit={patchAdventure}>
                    <label>Title:</label>
                    <textarea className="form-control"
                        type="text"
                        id="title"
                        autoComplete="off"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                    <label>Prompt:</label>
                    <textarea className="form-control"
                        type="text"
                        id="prompt"
                        autoComplete="off"
                        placeholder="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        />
                    <label>Description:</label>
                    <textarea className="form-control"
                        type="text"
                        id="description"
                        autoComplete="off"
                        placeholder="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        />
                </form>
                </div>
            </div>
        )
    } else {
        return(
            <div className="card">
                <div className="row">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <div className="btn-group">
                            <button type="button" className="btn btn-outline-primary btn-sm"onClick={() => deleteAdventure()}>X</button>
                            <EditButton adventure={currAdventure} setTarget={setTarget} />
                        </div>
                    </div>
                    <div className="col justify-content-center">
                        <h3 className="card-header">{currAdventure.title} </h3>
                    </div>
                </div>
                <h4 class="card-text">Prompt:</h4>
                <ul className="list-group">
                <p class="list-group-item">{currAdventure.prompt}</p>
                </ul>
                <h4 class="card-text">Description:</h4>
                <ul className="list-group">
                <p class="list-group-item">{currAdventure.description}</p>
                </ul>
                <button className="btn btn-outline-secondary" type="button" onClick={(e) => startAdventure(e)}>Begin</button>
            </div>
        )
    }
}
export default AdventureCard;