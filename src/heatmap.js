// HeatMap react
import React, {Component} from 'react';
//import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
//import Heatmap from './heatmap.min.js';
import HeatmapLayer from './HeatmapLayer';
//import Leaflet from 'leaflet';

export default class HeatMap extends Component {
    constructor(props){
	super(props);  

    }

    state = {
	mapHidden: false,
	layerHidden: false,
	addressPoints: null,
	radius: 4,
	blur: 8,
	max: 0.5,
	limitAddressPoints: true,
    };
    
    
    render() {
	return null;
	const gradient = {
	    0.1: '#89BDE0', 0.2: '#96E3E6', 0.4: '#82CEB6',
	    0.6: '#FAF3A5', 0.8: '#F5D98B', '1.0': '#DE9A96'
	};
	const addressPoints = [
	    [-37.8839, null, "571"],
	    [-37.8869090667, 175.3657417333, "486"],
	    [-37.8894207167, 175.4015351167, "807"],
	    [-37.8927369333, 175.4087452333, "899"],
	    [-37.90585105, 175.4453463833, "1273"],
	    [-37.9064188833, 175.4441556833, "1258"],
	    [-37.90584715, 175.4463564333, "1279"],
	    [-37.9033391333, 175.4244005667, "1078"],
	    [-37.9061991333, 175.4492620333, "1309"],
	    [-37.9058955167, 175.4445613167, "1261"],
	    [-37.88888045, 175.39146475, "734"],
	    [-37.8950811333, 175.41079175, "928"],
	    [-37.88909235, 175.3922956333, "740"],
	    [-37.8889259667, 175.3938591667, "759"],
	    [-37.8876576333, 175.3859563833, "687"]]
	return (
		<React.Fragment>
		<Map center={[0, 0]} zoom={13}>
		{!this.state.layerHidden &&
		 <HeatmapLayer
		 fitBoundsOnLoad
		 fitBoundsOnUpdate
		 points={addressPoints}
		 longitudeExtractor={m => m[1]}
		 latitudeExtractor={m => m[0]}
		 gradient={gradient}
		 intensityExtractor={m => parseFloat(m[2])}
		 radius={Number(this.state.radius)}
		 blur={Number(this.state.blur)}
		 max={Number.parseFloat(this.state.max)}
		 />
		}
	        <TileLayer
	    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
	    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	        />
		        </Map>
	 	</React.Fragment>
	)
    }

  
}
