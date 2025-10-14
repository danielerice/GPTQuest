import React, {useContext, useState, useEffect} from "react";
import { AdventureContext } from "../contexts/AdventureContext";
import { UserContext } from "../contexts/UserContext";

function ActiveAdventure () {
  const {adventure} = useContext(AdventureContext);
  const {user} = useContext(UserContext);
  
  const [currResponse, setCurrResponse] = useState(null);
  const [resText, setResText] = useState("");
  const [loading, setLoading] = useState(true);
  const [characterId, setCharacterId] = useState(null);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const response = await fetch('/api/characters/', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const characters = await response.json();
          const char = characters.find(c => c.adventure === adventure.id);
          
          if (char) {
            setCharacterId(char.id);
            startAdventure(char.id);
          } else {
            setError("No character found for this adventure");
            setLoading(false);
          }
        } else {
          setError("Failed to load character");
          setLoading(false);
        }
      } catch (err) {
        setError("Error loading character: " + err.message);
        setLoading(false);
      }
    }

    if (adventure && user) {
      fetchCharacter();
    }
  }, [adventure, user]);

  async function startAdventure(charId) {
    setLoading(true);
    try {
      const response = await fetch(`/api/characters/${charId}/start/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken()
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setCurrResponse(data.response);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to start adventure");
      }
    } catch (err) {
      setError("Error starting adventure: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function send(e) {
    e.preventDefault();
    
    if (!resText.trim()) return;

    setLoading(true);
    setCurrResponse(null);

    try {
      const response = await fetch(`/api/characters/${characterId}/generate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken()
        },
        credentials: 'include',
        body: JSON.stringify({ input: resText })
      });

      if (response.ok) {
        const data = await response.json();
        setCurrResponse(data.response);
        setResText("");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to generate response");
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const style = { width: "7rem", height: "7rem" };

  return (
    <div className="container align-content-center" style={{marginTop: "8vh"}}>
      <div className="col">
        <h1>{adventure?.title || "Loading..."}</h1>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" style={style}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          currResponse && <p style={{whiteSpace: 'pre-wrap'}}>{currResponse}</p>
        )}
        
        <form onSubmit={send}>
          <input 
            className="form-control" 
            type="text" 
            placeholder="What do you do?" 
            value={resText} 
            onChange={(e) => setResText(e.target.value)}
            disabled={loading}
            required
          />
          <button 
            type="submit" 
            className="btn btn-primary mt-2"
            disabled={loading || !resText.trim()}
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </form>
      </div>  
    </div>
  );
}

export default ActiveAdventure;
