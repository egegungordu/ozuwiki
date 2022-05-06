import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loading-skeleton/dist/skeleton.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
// TODO: Strict mode causes to render the app twice. Which leads to useEffect(..., []) being
// called twice. This is the reason the page appears to load twice 
const strict = false;
root.render(
  <BrowserRouter>
    {strict ? <React.StrictMode><App /></React.StrictMode>
            : <App />}
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
