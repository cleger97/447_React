import React, {Component} from 'react';
import CanvasJSReact from './canvasjs.react.js';
import './App.css';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class App extends Component {	
	render() {
		// Code is mostly in DataHandle, not wiring to App as of yet.
		return null;
	}
}


// old react stuff
/*import logo from './logo.svg';

  <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/