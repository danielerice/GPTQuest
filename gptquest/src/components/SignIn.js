import React, {useState} from "react";
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"

function SignIn() {

    const [newUser, setNewUser] = useState(false);

    return (
        <>
            <p>LOOOOGOOOOOOOO</p>
                <div>
                    {newUser ? (
                        <div>
                            <LoginForm />
                            <p>Don't have an account?</p>&nbsp;
                            <button onClick={() => setNewUser(false)}>Sign Up</button>
                        </div>
                        ) : (
                            <div>
                                <SignUpForm />
                                <p>Already have an account?&nbsp;</p>
                                <button onClick={() => setNewUser(true)}>Log In</button>
                            </div>
                             )}
                    </div>
            </>
    )
}
export default SignIn;