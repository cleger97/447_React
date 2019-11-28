// HeatMap react
import React, {Component} from 'react';
//import { Map, TileLayer } from 'react-leaflet';
//import Heatmap from './heatmap.min.js';
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
		<h5> Test 2 </h5>
		</React.Fragment>
	)
	   
    }

  
}
