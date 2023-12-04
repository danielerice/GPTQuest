import '../App.css';
import React, { useContext } from "react";
import {Route, Routes} from "react-router-dom"
import NavBar from "./NavBar";
import SignIn from './SignIn';
import Home from "./Home";
import Store from './ItemGrid';
import ActiveQuest from './ActiveAdventure';
import {UserContext} from "../contexts/UserContext";
import MyAdventures from './MyAdventures';

function App() {

  const {user} = useContext(UserContext);


  if (!user) return <SignIn/>

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
          path='/activeadventure'
          element={
            <ActiveQuest/>
          }
          />
        
        </Routes>
    </>
    )
}
export default App;
