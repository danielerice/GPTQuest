import React, { useContext, useState } from "react";
import EditButton from "./bits/EditButton";
import { useNavigate } from "react-router-dom";
import { AdventureContext } from "../contexts/AdventureContext";

function AdventureCard ({ currAdventure, onDelete, onUpdate }) {
    const navigate = useNavigate();
    const linkAdventure = () => navigate('/activeadventure');
    const {setAdventure} = useContext(AdventureContext);
    
    const [target, setTarget] = useState(0);
    const [title, setTitle] = useState(currAdventure.title);
    const [prompt, setPrompt] = useState(currAdventure.prompt);
    const [description, setDescription] = useState(currAdventure.description);
    const [alert, setAlert] = useState(null);

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
    
    async function startAdventure (event) {
        event.preventDefault();
        setAdventure(currAdventure);
        linkAdventure();
    }
    
    async function patchAdventure(e) {
        e.preventDefault();

        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCsrfToken()
            },
            credentials: 'include',
            body: JSON.stringify({ title, description, prompt })
        };

        try {
            const response = await fetch(`/api/adventures/${currAdventure.id}/`, configObj);
            const data = await response.json();

            if (response.ok) {
                if (onUpdate) onUpdate(data);
                setTarget(0);
            } else {
                setAlert("Update failed");
            }
        } catch (error) {
            setAlert("Update failed");
        }
    }

    async function deleteAdventure () {
        try {
            const response = await fetch(`/api/adventures/${currAdventure.id}/`, { 
                method: 'DELETE',
                headers: {
                    "X-CSRFToken": getCsrfToken()
                },
                credentials: 'include'
            });
            
            if (response.ok && onDelete) {
                onDelete(currAdventure.id);
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    }

    if (target === currAdventure.id) {
        return(
            <div className="card">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <div className="btn-group">
                        <button className="btn btn-outline-primary btn-sm" type="submit" onClick={patchAdventure}>Save</button>
                        <button className="btn btn-outline-primary btn-sm" onClick={() => setTarget(0)}>done</button>
                    </div>
                </div>
                <div className="card-body">
                {alert && <div className='alert alert-danger alert-dismissible fade show' role="alert">{alert}<button type="button" className="btn-close" onClick={() => setAlert(null)}></button></div>}
                <h2 className="card-header">{currAdventure.title}</h2>
                <form onSubmit={patchAdventure}>
                    <label>Title:</label>
                    <textarea className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label>Prompt:</label>
                    <textarea className="form-control" type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                    <label>Description:</label>
                    <textarea className="form-control" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </form>
                </div>
            </div>
        );
    } else {
        return(
            <div className="card">
                <div className="row">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <div className="btn-group">
                            <button type="button" className="btn btn-outline-primary btn-sm" onClick={deleteAdventure}>X</button>
                            <EditButton adventure={currAdventure} setTarget={setTarget} />
                        </div>
                    </div>
                    <div className="col justify-content-center">
                        <h3 className="card-header">{currAdventure.title}</h3>
                    </div>
                </div>
                <h4 className="card-text">Prompt:</h4>
                <ul className="list-group">
                <p className="list-group-item">{currAdventure.prompt}</p>
                </ul>
                <h4 className="card-text">Description:</h4>
                <ul className="list-group">
                <p className="list-group-item">{currAdventure.description}</p>
                </ul>
                <button className="btn btn-outline-secondary" type="button" onClick={startAdventure}>Begin</button>
            </div>
        );
    }
}
export default AdventureCard;
