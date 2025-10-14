import React, { useContext } from "react";
import {useNavigate} from 'react-router-dom';
import { UserContext } from "../contexts/UserContext";
import Logo from "./bits/Logo";

function NavBar() {
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const linkMyAdventures = () => navigate('/myadventures');

    function getCsrfToken() {
        const name = 'csrftoken';
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    async function logoutUser (event) {
        event.preventDefault();

        await fetch(`/api/users/signout/`, { 
            method: "POST",
            headers: {
                "X-CSRFToken": getCsrfToken()
            },
            credentials: 'include'
        });
        setUser(null);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid ">
                <a className="navbar-brand" href="/"><Logo fontProp={40} colorProp={"black"}/></a>
                <div className="d-flex">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button className="" onClick={linkMyAdventures}>My Adventures</button>
                    </li>
                    <li>
                        <button onClick={logoutUser} className="">Logout</button>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    );
}
export default NavBar;
