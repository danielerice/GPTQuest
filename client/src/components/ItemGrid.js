import React from "react";
import ItemCard from "./ItemCard";


const sword = {
    title: "Sword of Slicing",
    type: "weapon",
    context: [
        
        "a shiny 3 foot long double edged broadsword with a leather hilt that allows the user to use a sword able to cut through any substance except goose feathers"
    ],
    cost: 5,
    description: "Forged in 2021, used but in excellent condition, able to slice through any matierial except goose feathers. NO REFUNDS"
}

const beans = {
    title: "Magic Beans",
    type: "magic",
    context: [
        "a leather bag with 3 magic pinto beans in it, when the user eats a bean they either get a wish or uncontrollable farts"
        
    ],
    cost: 10,
    description: "A leather bag with 3 magic pinto beans in it, either grants wishes or flatulence."
}

const hat = {
    title: "Limited Edition SnapBack of Ultimate Clout",
    type: "Apparel",
    context: [
        "a hat that looks realy cool everyone will know how cool you are when you have this hat on"
        
    ],
    cost: 15,
    description: "Everyone will know how cool you are when you wear this hat. They'll also know how much you paid for it. keep the stickers on broh."
}



function ItemGrid ({selected, setSelected}) {

    const items = [sword, beans, hat]



    function createStoreGrid() {
        const grid = []
        for (let i=0; i < items.length; i++) {
            grid.push(
                <div key={i} className="row justify-content-center align-content-center gy-3">
                    <div className="col-10">{items[i] ? <ItemCard key={items[i].title} item={items[i]} setSelected={setSelected} selected={selected} />: console.log("nah") }</div>
                    <div className="col-10">{items[i+1] ? <ItemCard key={items[i+1].title} item={items[i+1]} setSelected={setSelected} selected={selected}/> : console.log("nah") }</div>
                    <div className="col-10">{items[i+2] ? <ItemCard key={items[i+1].title} item={items[i+2]} setSelected={setSelected} selected={selected}/> : console.log("nah") }</div>
                </div>)
                i++
                i++
        }
        return grid.map((row) => {
            return row
        })
    }

    return (
        <div>
            {createStoreGrid()}
        </div>
    )
}

export default ItemGrid;