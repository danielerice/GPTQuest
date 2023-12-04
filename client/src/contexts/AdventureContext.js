import { useState, createContext} from "react";



const AdventureContext = createContext();

function AdventureProvider({ children }) {

    const [adventure, setAdventure] = useState({
        "title": null,
        "prompt": null,
        "description": null,
        "items": [{title: null, context: [null] }]
    });

    return <AdventureContext.Provider value={{adventure, setAdventure}}>{children}</AdventureContext.Provider>
}

export {AdventureContext, AdventureProvider};