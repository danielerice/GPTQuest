import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function DeleteButton ({adventure}) {

const {user, setUser} = useContext(UserContext);
    
    function deleteAdventure () {
        //deletes adventure when clicked
        console.log("click")
        const response = fetch(`/adventures/${adventure.id}`, { method: 'DELETE' });
        const updatedAdventures = user.adventures.filter((curr) => curr.id !== adventure.id );
        const updatedUser = user
        updatedUser.adventures = updatedAdventures
        setUser(updatedUser);
    }

    return (
        <button onClick={() => deleteAdventure()}>X</button>
    )
}

export default DeleteButton;