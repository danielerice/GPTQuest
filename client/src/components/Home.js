import React, { useState } from "react";
import NewAdventureForm from "./NewAdventureForm";
import Logo from "./bits/Logo";

function Home() {

    const [alert, setAlert] = useState(null)

    return (
        <div className="container overflow-hidden">
            <div className="row justify-content-center align-content-center">
                <div className="col-12 offset-5 align-self-end">
                    <h1 className="display-1"><Logo fontSize={120}/></h1>{/* Make this a splashy logo */}
                </div>
                <div className="col-6 gy-4">
                {alert ? <div class='alert alert-danger alert-dismissible fade show' role="alert"><strong>Holy guacamole!</strong> {alert}<button type="button" class="btn-close" onClick={(e) => setAlert(null)} ></button></div> : <h5 className="col-12 text-align-center" style={{color: "white"}}>This is where it all begins! <br></br><br></br> 1: enter a Title, Description and Prompt for your new adventure. <br></br><br></br> 2: Choose your starting equipment. <br></br><br></br> 3: Click begin!</h5> }
                </div>
            
                <div className="col-12 gy-4">
                    <NewAdventureForm setAlert={setAlert}/>
                </div>
            </div>
        </div>
    )
}
export default Home;