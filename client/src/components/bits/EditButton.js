import React from "react";
import {ReactComponent as EditIcon} from "./EditIcon.svg"

function EditButton ({adventure, setTarget}) {



    return (
        <button onClick={() => setTarget(adventure.id)}><EditIcon/></button>
    )
}

export default EditButton;