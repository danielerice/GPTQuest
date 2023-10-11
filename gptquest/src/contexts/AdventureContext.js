import {useEffect, useState, createContext} from "react";



const AdventureContext = createContext();

function AdventureProvider({ children }) {

    const [adventures, setAdventures] = useState(null);

    useEffect(() => {
        fetch('/adventures')
        .then((r) => {
            if (r.ok) {
                r.json().then((adventures) => setAdventures(adventures))
              }
        })
    }, [])


    return <AdventureContext.Provider value={{adventures, setAdventures}}>{children}</AdventureContext.Provider>
}

export {AdventureContext, AdventureProvider};