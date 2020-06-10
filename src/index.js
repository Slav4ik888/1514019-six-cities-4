import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/index.jsx';

let offerValue = 2;


ReactDOM.render(
    <App offerValue={offerValue} />
    , document.getElementById('root'));