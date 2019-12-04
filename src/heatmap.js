// HeatMap react
import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import HeatmapLayer from './HeatmapLayer';


export default class HeatMap extends Component {

    constructor() {
	super()
	this.state = {
	    lat: 39.2904,
	    lng: -76.6122,
	    zoom: 11,
	    radius: 100,
	    blur: 100,
	    max: 0.5,
	    layerHidden: false
	}
    }

    addressPoints = [[39.29, -76.60, "1"],
		     [39.295, -76.60, "1"],
		     [39.298, -76.605, "1"],
		     [39.292, -76.646, "1"]];
    
    render() {
	const position = [this.state.lat, this.state.lng];

	const gradient = {
	    0.1: '#89BDE0', 0.2: '#96E3E6', 0.4: '#82CEB6',
	    0.6: '#FAF3A5', 0.8: '#F5D98B', '1.0': '#DE9A96'
	};
	
	return (
		<React.Fragment>
		<h5 style={{"color":"black"}}>Heatmap</h5>
		
	        <Map center={position} zoom={this.state.zoom}>

	    {!this.state.layerHidden &&
	     <HeatmapLayer
	     fitBoundsOnLoad
	     fitBoundsOnUpdate
	     points={this.state.addressPoints}
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
	    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
	        />
		<Marker position={position}>
		<Popup>
		A pretty CSS3 popup. <br/> Easily customizable.
		</Popup>
		</Marker>
		</Map>
		
		</React.Fragment>
	);
    }
    
}
