import React from "react";
import {ReactComponent as EditIcon} from "./EditIcon.svg"

function EditButton ({adventure, setTarget}) {



    return (
        <button className="btn btn-outline-primary btn-sm" onClick={() => setTarget(adventure.id)}>edit</button>
    )
}

export default EditButton;