import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Router, Route, Link } from 'react-router-dom';
import history from './utils/history';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/journal/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const app = (
  <Router history={history}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Router>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
