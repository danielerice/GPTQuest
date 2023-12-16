import React, {useState} from "react";
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"
import Logo from "./bits/Logo";

function SignIn() {

    const [newUser, setNewUser] = useState(false);

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col">
                    <Logo/>
                </div>
            </div>
            <div className="row justify-content-center">
                {newUser ? (
                    <div className="container-fluid">
                            <LoginForm />
                        <div className="container-fluid">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-2 gy-5">
                                    <h2 className="text-center">-Or-</h2>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-3 gy-5">
                                    <button className="bttn" onClick={() => setNewUser(false)}>Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ) : (
                        <div className="container-fluid">
                                <SignUpForm />
                                <div className="row justify-content-center">
                                    <div className="col-2 gy-5">
                                        <h2 className="text-center">-Or-</h2>
                                    </div>
                                </div>
                            <div className="row justify-content-center">
                                <div className="col-3 justify-self-center gy-5">
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