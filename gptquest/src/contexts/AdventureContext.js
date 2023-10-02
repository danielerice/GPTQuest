import {useEffect, useState, createContext} from "react";



const AdventureContext = createContext();

function AdventureProvider({ children }) {

    const [adventure, setAdventure] = useState(null);

    // useEffect(() => {
    //     fetch('/me')
    //     .then((r) => {
    //         if (r.ok) {
    //             r.json().then((user) => setUser(user))
    //           }
    //     })
    // }, [])


    return <AdventureContext.Provider value={{adventure, setAdventure}}>{children}</AdventureContext.Provider>
}

export {AdventureContext, AdventureProvider};