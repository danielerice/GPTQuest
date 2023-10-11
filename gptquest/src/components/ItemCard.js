import React from "react";

function ItemCard({item}) {
    return (
        <div className="container">
            <p>{item.title}</p>
            <p>IMAGE</p>
            <p>{item.cost.toString()}</p>
            <p>{item.description}</p>
            <button>BUY</button>
        </div>
    )
}

export default ItemCard;