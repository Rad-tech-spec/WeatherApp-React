import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import {BrowserRouter} from 'react-router-dom'
import './App.css'


ReactDOM.render(
<BrowserRouter><App/></BrowserRouter>,
document.getElementById('root')
);


