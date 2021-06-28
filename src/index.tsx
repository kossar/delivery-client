import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Router>,
  document.getElementById('root')
);

