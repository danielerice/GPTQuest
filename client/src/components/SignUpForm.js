import React, {useState, useContext} from "react";
import { UserContext } from "../contexts/UserContext";

function SignUpForm() {
    
    //user context for createNewUser sign in
    const {setUser} = useContext(UserContext);

    //Sign up controlled form values
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alert, setAlert] = useState(null);
    
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
            setAlert(newUser.errors)
          }

        setUsername("")
        setPassword("")
        setConfirmPassword("")
    }
    
    
    return (
            <div className="row align-items-center justify-content-center">
                <div className="col-6">
                    {alert ? <div className='alert alert-danger alert-dismissible fade show' role="alert"><strong>Holy guacamole!</strong> {alert}<button type="button" className="btn-close" onClick={(e) => setAlert(null)} ></button></div> : <></>}
                    <form onSubmit={createNewUser}>
                        <label>Username:</label>
                        <input className="form-control"
                            type="text"
                            id="username"
                            autoComplete="off"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            />
                        <label>Password:</label>
                        <input className="form-control"
                            type="password"
                            id="password"
                            autoComplete="off"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        <label>Confirm Password:</label>
                        <input className="form-control"
                            type="password"
                            id="confirmPassword"
                            autoComplete="off"
                            placeholder="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                        <div className="col-4 offset-4">
                            <button className="bttn" type="submit">Create Account</button>
                        </div>
                    </form>
                </div>
            </div>
    )
}
export default SignUpForm;