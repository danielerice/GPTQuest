import React, { useContext } from "react";
import {useNavigate} from 'react-router-dom';
import { UserContext } from "../contexts/UserContext";
import Logo from "./bits/Logo";

function NavBar() {

    //User context for logout button
    const {setUser} = useContext(UserContext);

    //link to myAdventures
    const navigate = useNavigate();
    const linkMyAdventures = () => navigate('/myadventures');

    //fires when logout button is clicked deletes session
    async function logoutUser (event) {
        event.preventDefault();

        console.log("logout user alert!!")

        fetch(`/logout`, { method: "DELETE" })
        setUser("")
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid ">
                <a className="navbar-brand" href="/"><Logo fontSize={40} color={"black"}/></a>
                <div className="d-flex">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button className="" onClick={(e) => linkMyAdventures()}>My Adventures</button>
                    </li>
                    <li>
                        <button onClick={(e) => logoutUser(e)} className="">Logout</button>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}
export default NavBar;