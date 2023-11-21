import React, {useState} from "react";

function ItemCard({item, selected, setSelected}) {


    const itemStyleObj = {
        fontSize: "2vh"
    }

    const selectedStyle = {
        borderColor: "#FFD15B",
        borderWidth: "2px"
    }

    const unselectedStyle = {
        borderColor: "grey"
    }

    function handleCheck(e) {
        console.log("check")
    }

    return (
        <div className="card" style={selected === item ? selectedStyle : unselectedStyle}>
            <p>{item.title}</p>
            <p style={itemStyleObj} >{item.description}</p>
            <p>{item.cost.toString()}</p>
            <button type="button" className="btn" onClick={(e) => setSelected(item)}>Select</button>
        </div>
    )
}

export default ItemCard;