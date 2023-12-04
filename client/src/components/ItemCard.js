import React from "react";

function ItemCard({item, selected, setSelected}) {


    const selectedStyle = {
        borderColor: "#FFD15B",
        borderWidth: "2px"
    }

    const unselectedStyle = {
        borderColor: "grey"
    }

    return (
        <div className="col-12">
            <div className="card text-center" style={selected === item ? selectedStyle : unselectedStyle}>
                <div className="card-header">
                        {item.type}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <button type="button" onClick={(e) => setSelected(item)} className="bttn">select</button>
                </div>
            </div>
        </div>
    )
}

export default ItemCard;