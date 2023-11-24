import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import  {BrowserRouter} from 'react-router-dom';
import {UserProvider} from "./contexts/UserContext"
import { AdventureProvider } from './contexts/AdventureContext';


// Importing the Bootstrap CSS
import './index.css';
import 'bootstrap/dist/js/bootstrap.min.js'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AdventureProvider>
      <UserProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UserProvider>
    </AdventureProvider>  
  </BrowserRouter>
  );
