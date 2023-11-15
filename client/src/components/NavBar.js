import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function NavBar() {

    //User context for logout button
    const {setUser} = useContext(UserContext);

    //fires when logout button is clicked deletes session
    async function logoutUser (event) {
        event.preventDefault();

        console.log("logout user alert!!")

        const response = await fetch(`/logout`, { method: "DELETE" })
        setUser("")
    }

    return (
        <div className="NavBar">
            <Link to="/">
                <p className="NavLogo">
                    GPTQUEST
                </p>
            </Link>

            <Link className="NavLink" to="/myadventures">
                <p>
                    My Adventures
                </p>
            </Link>

            <button className="pixel2 fixedButton" onClick={(e) => logoutUser(e)}>Logout</button>
        </div>
    )
}
export default NavBar;