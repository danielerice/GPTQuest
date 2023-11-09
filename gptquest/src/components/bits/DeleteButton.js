import React, { useContext } from "react";
import { AdventureContext } from "../../contexts/AdventureContext";

function DeleteButton ({adventure}) {

    const {adventures, setAdventures} = useContext(AdventureContext);

    function deleteAdventure () {
        //deletes adventure when clicked
        console.log("click")
        const response = fetch(`/adventures/${adventure.id}`, { method: 'DELETE' });
        const updatedAdventures = adventures.filter((curr) => curr.id !== adventure.id );
        setAdventures(updatedAdventures);
    }

    return (
        <button onClick={() => deleteAdventure()}>X</button>
    )
}

export default DeleteButton;