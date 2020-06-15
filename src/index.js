import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/app.jsx';


let offers = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Nice, cozy, warm big bed apartment`];

ReactDOM.render(
    <App offers={offers} />
    , document.getElementById(`root`));
