import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import InOutChart from './InOutChart'
import WeaponTypeChart from './WeaponTypeChart'
import Timeline from './Timeline'

//ReactDOM.render(<App />, document.getElementById('root'));

//ReactDOM.render(<DataHandle />, document.getElementById('data'));

ReactDOM.render(<InOutChart />, document.getElementById('inoutchart'));

ReactDOM.render(<WeaponTypeChart />, document.getElementById('weaponchart'));

ReactDOM.render(<Timeline />, document.getElementById('timeline'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
