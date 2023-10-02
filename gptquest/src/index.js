import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import  {BrowserRouter} from 'react-router-dom';
import {UserProvider} from "./contexts/UserContext"
import { AdventureProvider } from './contexts/AdventureContext';

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
