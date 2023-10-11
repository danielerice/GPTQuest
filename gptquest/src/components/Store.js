import React, { useContext } from "react";
import ItemCard from "./ItemCard";
import { UserContext } from "../contexts/UserContext";

const sword = {
    title: "Sword",
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



function Store () {

    const {user, setUser} = useContext(UserContext);
    const items = [sword, beans]

    return (
        <div>
            {items.map((item) => {
                return(
                    <ItemCard
                        key={item.title}
                        item={item}
                    />
                )
            })}
        </div>
    )
}

export default Store;