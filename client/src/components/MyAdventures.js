import React, { useState, useEffect } from "react";
import AdventureCard from "./AdventureCard";

function MyAdventures () {
    const [adventures, setAdventures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdventures();
    }, []);

    async function fetchAdventures() {
        try {
            const response = await fetch('/api/adventures/', {
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                setAdventures(data);
            }
        } catch (error) {
            console.error("Error fetching adventures:", error);
        } finally {
            setLoading(false);
        }
    }

    function handleDelete(id) {
        setAdventures(adventures.filter(adv => adv.id !== id));
    }

    function handleUpdate(updatedAdventure) {
        setAdventures(adventures.map(adv => 
            adv.id === updatedAdventure.id ? updatedAdventure : adv
        ));
    }

    function createAdventureGrid() {
        const grid = [];
        for (let i = 0; i < adventures.length; i += 2) {
            grid.push(
                <div key={i} className="row justify-content-center align-content-center">
                    <div className="col-6 gy-5">
                        {adventures[i] && (
                            <AdventureCard 
                                key={adventures[i].id} 
                                currAdventure={adventures[i]}
                                onDelete={handleDelete}
                                onUpdate={handleUpdate}
                            />
                        )}
                    </div>
                    <div className="col-6 gy-5">
                        {adventures[i + 1] && (
                            <AdventureCard 
                                key={adventures[i + 1].id} 
                                currAdventure={adventures[i + 1]}
                                onDelete={handleDelete}
                                onUpdate={handleUpdate}
                            />
                        )}
                    </div>
                </div>
            );
        }
        return grid;
    }

    if (loading) {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col gy-5">
                        <h2 className="text-center">Loading...</h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            {adventures.length < 1 ? (
                <div className="row justify-content-center">
                    <div className="col gy-5">
                        <h2 className="text-center">
                            Oops! Looks like you haven't created any adventures yet. 
                            To create an adventure go to the <a className="link-opacity-100" href="/">Home</a> page and fill out the form. Good luck!
                        </h2>
                    </div>
                </div>
            ) : (
                createAdventureGrid()
            )}
        </div>
    );
}

export default MyAdventures;
