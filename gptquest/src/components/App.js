import '../App.css';
import React, { useContext } from "react";
import {Route, Routes} from "react-router-dom"
import NavBar from "./NavBar";
import SignIn from './SignIn';
import Home from "./Home";
import Store from './Store';
import ActiveQuest from './ActiveAdventure';
import {UserContext} from "../contexts/UserContext";
import { AdventureContext } from '../contexts/AdventureContext';
import MyAdventures from './MyAdventures';

function App() {

  const {user, setUser} = useContext(UserContext);
  const {adventures, setAdventures} = useContext(AdventureContext);
// console.log(user)

  if (!user) return <SignIn/>
  if (adventures) {
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
          path="/myadventures"
          element={
            <MyAdventures/>
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
