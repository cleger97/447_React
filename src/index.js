import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import InOutChart from './InOutChart'
import WeaponTypeChart from './WeaponTypeChart'
import HeatMap from './heatmap';
import Timeline from './Timeline';
import FilterBox from './FilterBox'

//ReactDOM.render(<App />, document.getElementById('root'));

//ReactDOM.render(<DataHandle />, document.getElementById('data'));

ReactDOM.render(<InOutChart />, document.getElementById('inoutchart'));

ReactDOM.render(<WeaponTypeChart />, document.getElementById('weaponchart'));


ReactDOM.render(<HeatMap />, document.getElementById('heatmap'));

ReactDOM.render(<Timeline />, document.getElementById('timeline'));

ReactDOM.render(<FilterBox />, document.getElementById('dataForm'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
