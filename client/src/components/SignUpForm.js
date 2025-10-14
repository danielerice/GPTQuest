import React, {useState, useContext} from "react";
import { UserContext } from "../contexts/UserContext";

function SignUpForm() {
    const {setUser} = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
    
    async function createNewUser (event) {
        event.preventDefault();
        
        if (password !== confirmPassword) {
            setAlert("Passwords don't match!");
            return;
        }

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
            const response = await fetch(`/api/users/signup/`, configObj);
            const data = await response.json();

            if (response.ok) {
                setUser(data);
            } else {
                setAlert(data.error || "Signup failed");
            }
        } catch (error) {
            setAlert("Signup failed");
        }
    }
    
    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-6">
                {alert && (
                    <div className='alert alert-danger alert-dismissible fade show' role="alert">
                        <strong>Holy guacamole!</strong> {alert}
                        <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
                    </div>
                )}
                <form onSubmit={createNewUser}>
                    <label>Username:</label>
                    <input 
                        className="form-control"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label>Password:</label>
                    <input 
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>Confirm Password:</label>
                    <input 
                        className="form-control"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <div className="col-4 offset-4">
                        <button className="bttn" type="submit">Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default SignUpForm;
