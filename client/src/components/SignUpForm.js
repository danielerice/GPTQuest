import React, {useState, useContext} from "react";
import { UserContext } from "../contexts/UserContext";

function SignUpForm() {
    
    //user context for createNewUser sign in
    const {setUser} = useContext(UserContext);

    //Sign up controlled form values
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    async function createNewUser (event) {
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

        const response = await fetch(`/signup`, configObj);
        const newUser = await response.json()

        if (response.status === 201) {
            setUser(newUser)
          } else {
            console.log(newUser.errors)
          }

        setUsername("")
        setPassword("")
        setConfirmPassword("")
    }
    
    
    return (
        <div>
            <form onSubmit={createNewUser}>
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
                <label>Confirm Password:</label>
                <input className="signin-form-box"
                    type="password"
                    id="confirmPassword"
                    autoComplete="off"
                    placeholder="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                <div className="center"><button className="pixel2" type="submit">Create Account</button></div>
            </form>
        </div>
    )
}
export default SignUpForm;