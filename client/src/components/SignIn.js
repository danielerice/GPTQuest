import React, {useState} from "react";
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"
import Logo from "./bits/Logo";

function SignIn() {

    const [newUser, setNewUser] = useState(false);

    return (
        <>
            <div className="container"><Logo fontSize={80}/></div>
                <div className="col-6 mx-auto">
                    {newUser ? (
                        <div>
                            <LoginForm />
                            <p>Don't have an account?</p>
                            <div className="col-2 mx-auto"><button className="pixel2" onClick={() => setNewUser(false)}>Sign Up</button></div>
                        </div>
                        ) : (
                            <div>
                                <SignUpForm />
                                <p>Already have an account?</p>
                                <div className="col-2 mx-auto"><button className="pixel2" onClick={() => setNewUser(true)}>Login</button></div>
                            </div>
                             )}
                    </div>
            </>
    )
}
export default SignIn;