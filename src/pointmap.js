import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

var allInstancesFetch = "http://ec2-34-228-208-5.compute-1.amazonaws.com/crimeinstances/";
export default class PointMap extends Component {

    constructor() {
	super()
	this.state = {
	         ready: false,
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
	    data:{},
	}
    }

    componentDidMount() {
      Promise.all([getData(this, this.props.filter)]);
    }

    componentDidUpdate(oldProps){
      if(this.props.filter != oldProps.filter){
	  this.setState({data: {}, keys: {}, ready: false});
	  Promise.all([getData(this, this.props.filter)]);
      }
    }
    


        
    render() {

	const position = [this.state.lat, this.state.lng];
	const gradient = {
	    0.1: '#89BDE0', 0.2: '#96E3E6', 0.4: '#82CEB6',
	    0.6: '#FAF3A5', 0.8: '#F5D98B', 1.0: '#DE9A96'
	};

	//this block will prevent the loading of any points until
	//after the data has been fetched
	//notice setting of this.state.ready in the fetch data function and the points={null} value in this return
	if(this.state.ready == false){
	    return (

				<React.Fragment>
		<h5 style={{"color":"black"}}>Pointmap</h5>
		
	        <Map center={position} zoom={this.state.zoom}>

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
	
	return (
		<React.Fragment>
		<h5 style={{"color":"black"}}>Heatmap</h5>
		
	        <Map center={position} zoom={this.state.zoom}>


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

function getData(obj, filter){

    fetch(allInstancesFetch + filter, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
       }
 
    })
    .then((res) => res.json())
    .then(data => {
	obj.setState({ data : data,
		       ready: true,
		     });
    });    
}
