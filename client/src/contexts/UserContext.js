import {useEffect, useState, createContext} from "react";

const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/api/users/me/', {
            credentials: 'include'
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user))
            }
        })
        .catch(err => console.log('Not logged in'))
    }, [])

    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider};
