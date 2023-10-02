import React, {useState, useContext} from "react";
import { UserContext } from "../contexts/UserContext";

function SignUpForm() {
    
    //user context for createNewUser sign in
    const {setUser} = useContext(UserContext);

    //Sign up controlled form values
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    function createNewUser (event) {
        event.preventDefault();
        
        const formData = {
            "username": username,
            "password": password,
            "password_confirmation": confirmPassword
        };

        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(formData),
            };
        
        console.log("new user alert!!", formData)
    }
    
    
    return (
        <div>
            <form onSubmit={createNewUser}>
                <label>Username:</label>
                <input
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                <label>Passowrd:</label>
                <input
                    type="text"
                    id="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <label>Confirm Passowrd:</label>
                <input
                    type="text"
                    id="confirmPassword"
                    autoComplete="off"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                <input type="submit" value="Create Account"></input>
            </form>
        </div>
    )
}
export default SignUpForm;