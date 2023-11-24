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
        <div className="col-12">
            <div class="card text-center" style={selected === item ? selectedStyle : unselectedStyle}>
                <div class="card-header">
                        {item.type}
                </div>
                <div class="card-body">
                    <h5 class="card-title">{item.title}</h5>
                    <p class="card-text">{item.description}</p>
                    <button type="button" onClick={(e) => setSelected(item)} className="bttn">select</button>
                </div>
                <p class="card-footer">
                    {`${item.cost.toString()} gold`}
                </p>
            </div>
        </div>
    )
}

export default ItemCard;