import React, {useContext, useState} from "react";
import { UserContext } from "../contexts/UserContext";

function LoginForm() {
    
    //user context for loginUser sign in
    const {setUser} = useContext(UserContext);

    //Login controlled form values
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    async function loginUser (event) {
        event.preventDefault();

        const formData = {
            "username": username,
            "password": password
            };
          
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(formData)
        };

        const response = await fetch(`/login`, configObj);
        const newLogin = await response.json();

        if (response.status === 201) {
            setUser(newLogin)
        } else {
            console.log("login fail",newLogin.errors)
        }
    };
    
    
    return (
        <div>
        <form onSubmit={loginUser}>
            <label>Username:</label>
            <input className="signin-form-box"
                type="text"
                id="username"
                autoComplete="off"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            <label>Password:</label>
            <input className="signin-form-box"
                type="password"
                id="password"
                autoComplete="off"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            <div className="center"><button type="submit" className="pixel2">Login</button></div>
        </form>
    </div>
    )
}
export default LoginForm;