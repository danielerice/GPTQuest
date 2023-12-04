import React, {useState} from "react";
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"
import Logo from "./bits/Logo";

function SignIn() {

    const [newUser, setNewUser] = useState(false);

    return (
        <div className="container-fluid">
            <div className="row align-items-center justify-content-center">
                <div className="col-7 offset-3">
                    <Logo fontSize={120}/>
                </div>
            </div>
            <div className="row align-items-center justify-content-center">
                {newUser ? (
                    <div className="container-fluid">
                            <LoginForm />
                        <div className="container-fluid">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-1 gy-5 text-center">
                                    <h2>-  Or  -</h2>
                                </div>
                            </div>
                            <div className="row align-items-center justify-content-center">
                                <div className="col-2 gy-5">
                                    <button className="bttn" onClick={() => setNewUser(false)}>Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ) : (
                        <div className="container-fluid">
                                <SignUpForm />
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-1 gy-5 text-center">
                                        <h2>-  Or  -</h2>
                                    </div>
                                </div>
                            <div className="row align-items-center justify-content-center">
                                <div className="col-1 gy-5">
                                    <button className="bttn" onClick={() => setNewUser(true)}>Login</button>
                                </div>
                            </div>
                        </div>
                            )}
            </div>
        </div>
    )
}
export default SignIn;