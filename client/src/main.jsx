
import ReactDOM from 'react-dom/client';
import './main.scss';
import App from './App';
import { inject } from '@vercel/analytics';
import { StrictMode } from 'react';


import './styles/spacelab.css';
import 'bootstrap-icons/font/bootstrap-icons.css';





inject();

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <App />
);


