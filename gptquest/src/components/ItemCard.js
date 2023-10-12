import React from "react";

function ItemCard({item}) {

    async function createNewItem() {
        //this will create a new instance of the correct version of the itme and assiate it with the current user
    }

    return (
        <div className="adventureCard">
            <p>{item.title}</p>
            <p>IMAGE</p>
            <p>{item.cost.toString()}</p>
            <p>{item.description}</p>
            <button>BUY</button>
        </div>
    )
}

export default ItemCard;