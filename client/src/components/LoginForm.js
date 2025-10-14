import React, {useContext, useState} from "react";
import { UserContext } from "../contexts/UserContext";

function LoginForm() {
    const {setUser} = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(null);

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
    
    async function loginUser (event) {
        event.preventDefault();
        
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCsrfToken()
            },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        };

        try {
            const response = await fetch(`/api/users/signin/`, configObj);
            const data = await response.json();

            if (response.ok) {
                setUser(data);
            } else {
                setAlert(data.error || "Login failed");
            }
        } catch (error) {
            setAlert("Login failed");
        }
    };
    
    return (
        <div className="row justify-content-center">
            <div className="col-6">
                {alert && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Holy guacamole!</strong> {alert}
                        <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
                    </div>
                )}
                <form onSubmit={loginUser}>
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <label>Username:</label>
                            <input 
                                className="form-control"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <label>Password:</label>
                            <input 
                                className="form-control"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-3">
                            <button type="submit" className="bttn">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default LoginForm;
