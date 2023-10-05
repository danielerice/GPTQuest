import '../App.css';
import React, { useContext } from "react";
import {Route, Routes} from "react-router-dom"
import NavBar from "./NavBar";
import SignIn from './SignIn';
import Home from "./Home";
import Store from './Store';
import MyQuests from './MyQuests';
import ActiveQuest from './ActiveQuest';
import {UserContext} from "../contexts/UserContext";
import { AdventureContext } from '../contexts/AdventureContext';

function App() {

  const {user, setUser} = useContext(UserContext);
  const {adventures, setAdventures} = useContext(AdventureContext);
console.log(user)

  if (!user) return <SignIn/>
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

        <Route 
          path="/store"
          element={
            <Store/>
        }
        ></Route>

        <Route 
          path="/myquests"
          element={
            <MyQuests/>
        }
        ></Route>

        <Route
          path='/activequest'
          element={
            <ActiveQuest/>
          }
          />
        
        </Routes>
    </>
    )}
}
export default App;
