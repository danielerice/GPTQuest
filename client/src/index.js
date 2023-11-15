import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import  {BrowserRouter} from 'react-router-dom';
import {UserProvider} from "./contexts/UserContext"


// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <UserProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UserProvider>
  </BrowserRouter>
  );
