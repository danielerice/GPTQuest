import '../App.css';
import React, { useContext } from "react";
import {Route, Routes} from "react-router-dom"
import NavBar from "./NavBar"
import SignIn from './SignIn';
import Home from "./Home"
import {UserContext} from "../contexts/UserContext"
import { AdventureContext } from '../contexts/AdventureContext';

function App() {

  const {user, setUser} = useContext(UserContext);
  const {adventures, setAdventures} = useContext(AdventureContext);


  if (!false) return <SignIn/>
  if (true) {
    return (
    <>
        <NavBar key={'navBar'}/>
        <Routes>
          
          <Route 
            path="/"
            element={
              <Home/>
          }
          ></Route>
          
          </Routes>
    </>
    )}
}
export default App;
