import React from "react";

function ItemCard({item}) {

    async function createNewItem() {
        //this will create a new instance of the correct version of the itme and associate it with the current user

        console.log(item.context)
        const formData = {
            "title": item.title,
            "context": item.context
            };
          
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(formData)
        };

        
        console.log(item)
        const response = await fetch(`/items`, configObj)
        const newItem = await response.json()
        console.log(newItem)
    }

    return (
        <div className="adventureCard">
            <p>{item.title}</p>
            <p>IMAGE</p>
            <p>{item.cost.toString()}</p>
            <p>{item.description}</p>
            <button onClick={() => createNewItem()}>BUY</button>
        </div>
    )
}

export default ItemCard;