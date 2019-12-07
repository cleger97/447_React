// HeatMap react
import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import HeatmapLayer from './HeatmapLayer';

const addressPoints = [[39.29, -76.60, "999"],
		 [39.295, -76.60, "999"],
		 [39.298, -76.605, "999"],
		 [39.292, -76.646, "999"]];

export default class HeatMap extends Component {

    constructor() {
	super()
	this.state = {
	    lat: 39.2904,
	    lng: -76.6122,
	    zoom: 11,

	    mapHidden: false,
	    layerHidden: false,
	    addressPoints,
	    radius: 18,
	    blur: 8,
	    max: 0.5,
	    limitAddressPoints: true,  
	}
    }


        
    render() {
	const position = [this.state.lat, this.state.lng];


	if (this.state.mapHidden) {
	    return (
		    <div>
		    <input
		type="button"
		value="Toggle Map"
		onClick={() => this.setState({ mapHidden: !this.state.mapHidden })}
		    />
		    </div>
	    );
	}
	
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

		
		<input
	    type="button"
	    value="Toggle Heatmap"
	    onClick={() => this.setState({ layerHidden: !this.state.layerHidden })}
	        />
		

	        <div style={{"color":"black"}}>
		Radius
	        <input
	    type="range"
	    min={1}
	    max={40}
	    value={this.state.radius}
	    onChange={(e) => this.setState({ radius: e.currentTarget.value })}
	        /> {this.state.radius}
	    </div>

	        <div style={{"color":"black"}}>
		Blur
	        <input 
	    type="range"
	    min={1}
	    max={20}
	    value={this.state.blur}
	    onChange={(e) => this.setState({ blur: e.currentTarget.value })}
	        /> {this.state.blur}
	    </div>
	    
		</React.Fragment>
	);
    }
    
}
