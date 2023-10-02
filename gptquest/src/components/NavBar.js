import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function NavBar() {

    //User context for logout button
    const {setUser} = useContext(UserContext);

    function logoutUser (event) {
        console.log("logout user alert!!")
    }

    return (
        <div className="NavBar">
            <Link to="/">
                <p className="logo">
                    GPTQUEST
                </p>
            </Link>

            <Link to="/store">
                <p>
                    Store
                </p>
            </Link>

            <Link to="/myquests">
                <p>
                    My Quests
                </p>
            </Link>

            <button onClick={(e) => logoutUser(e)}>Logout</button>
        </div>
    )
}
export default NavBar;