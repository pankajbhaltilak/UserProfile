import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);
