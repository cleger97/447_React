// HeatMap react
import React, {Component} from 'react';
//import { render } from 'react-dom';
//import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
//import Heatmap from './heatmap.min.js';
import HeatmapLayer from '../src';
import Leaflet from 'leaflet';

export default class HeatMap extends Component {

    constructor(props){
	super(props);
    }

    
    
    
    render() {
	return (
		<React.Fragment>
		<h5> This is a test </h5>
		<div id="mapid">
		<script src="heatmap.min.js"></script>
		<script src="leaflet-heatmap.js"></script>
		</div>
		<h5> Test 999 </h5>
		</React.Fragment>
	)
    }

  
}
