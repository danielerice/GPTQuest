import { useState, createContext} from "react";



const AdventureContext = createContext();

function AdventureProvider({ children }) {

    const [adventure, setAdventure] = useState(null);

    return <AdventureContext.Provider value={{adventure, setAdventure}}>{children}</AdventureContext.Provider>
}

export {AdventureContext, AdventureProvider};