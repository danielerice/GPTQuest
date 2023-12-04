import React, {useContext, useState} from "react";
import { UserContext } from "../contexts/UserContext";

function LoginForm() {
    
    //user context for loginUser sign in
    const {setUser} = useContext(UserContext);

    //Login controlled form values
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(null)
    
    async function loginUser (event) {
        event.preventDefault();
        console.log("login")
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
            console.log(response)
            setAlert("Wrong username or password")
        }
    };
    
    
    return (
        <div className="row row align-items-center justify-content-center">
            <div className="col-6">
                {alert ? <div className="alert alert-danger alert-dismissible fade show" role="alert"><strong>Holy guacamole!</strong> {alert}<button type="button" className="btn-close" onClick={(e) => setAlert(null)} ></button></div> : <></>}
                <form onSubmit={loginUser}>
                    <div className="row align-items-center justify-content-center">
                        <div className="col-12">
                            <label>Username:</label>
                            <input className="form-control"
                                type="text"
                                id="username"
                                autoComplete="off"
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                />
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-center">
                        <div className="col-12">
                            <label>Password:</label>
                            <input className="form-control"
                                type="password"
                                id="password"
                                autoComplete="off"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-center">
                        <div className="col-2">
                            <button type="submit" className="bttn">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LoginForm;