import React, { useContext, useState } from "react";
import ItemCard from "./ItemCard";
import { UserContext } from "../contexts/UserContext";

const sword = {
    title: "Sword of Slicing",
    context: [
        "allows the character to use a sword able to cut through any substance except goose feathers",
        "a shiny 3 foot long double edged broadsword with a leather hilt"
    ],
    cost: 300000,
    description: "Forged in 2021, used but in excellent condition, able to slice through any matierial except goose feathers. NO REFUNDS"
}

const beans = {
    title: "Magic Beans",
    context: [
        "a leather bag with 3 magic pinto beans in it",
        "when the user eats a bean they either get a wish or uncontrollable farts"
    ],
    cost: 5000,
    description: "A leather bag with 3 magic pinto beans in it, either grants wishes or flatulence."
}

const hat = {
    title: "Limited Edition SnapBack of Ultimate Clout",
    context: [
        "a hat that looks realy cool",
        "everyone will know how cool you are when you have this hat on"
    ],
    cost: 420690000,
    description: "Everyone will know how cool you are when you wear this hat. They'll also know how much you paid for it. kepp the stickers on broh."
}



function ItemGrid ({selected, setSelected}) {

    const {user, setUser} = useContext(UserContext);
    const items = [sword, beans, hat]



    function createStoreGrid() {
        const grid = []
        for (let i=0; i < items.length; i++) {
            grid.push(
                <div className="row">
                    <div className="col">{items[i] ? <ItemCard key={items[i].title} item={items[i]} setSelected={setSelected} selected={selected} />: console.log("nah") }</div>
                    <div className="col">{items[i+1] ? <ItemCard key={items[i+1].title} item={items[i+1]} setSelected={setSelected} selected={selected}/> : console.log("nah") }</div>
                    <div className="col">{items[i+2] ? <ItemCard key={items[i+1].title} item={items[i+2]} setSelected={setSelected} selected={selected}/> : console.log("nah") }</div>
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