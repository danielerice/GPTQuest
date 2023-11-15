import React, {useState} from "react";

function ItemCard({item, selected, setSelected}) {



    // async function createNewItem() {
    //     //this will create a new instance of the correct version of the item and associate it with the new adventure


    //     const formData = {
    //         "title": item.title,
    //         "context": item.context
    //         };
          
    //     const configObj = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json",
    //         },
    //         body: JSON.stringify(formData)
    //     };

        
    //     console.log(item)
    //     const response = await fetch(`/items`, configObj)
    //     const newItem = await response.json()
    //     console.log(newItem)
    // }

    const itemStyleObj = {
        fontSize: "2vh"
    }

    const selectedStyle = {
        borderColor: "green",
        borderWidth: "6px"
    }

    const unselectedStyle = {
        borderColor: "grey"
    }

    function handleCheck(e) {
        console.log("check")
    }

    return (
        <div className="itemCard" style={selected === item.title ? selectedStyle : unselectedStyle}>
            <p>{item.title}</p>
            <p style={itemStyleObj} >{item.description}</p>
            <p>{item.cost.toString()}</p>
            <button type="button" onClick={(e) => setSelected(item.title)}>Select</button>
        </div>
    )
}

export default ItemCard;