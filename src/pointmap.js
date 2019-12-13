import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

var allInstancesFetch = "http://ec2-34-228-208-5.compute-1.amazonaws.com/latitude-longitude-all/";
export default class PointMap extends Component {

    constructor() {
	super()
	this.state = {
	    ready: false,
	    lat: 39.2904,
	    lng: -76.6122,
	    zoom: 11,
	    maxPage: 0,
	    mapHidden: false,
	    layerHidden: false,
	    
	    max: 0.5,
	    limitAddressPoints: true,
	    data:{},
	}
	this.getNext = this.getNext.bind(this)
	this.getPrev = this.getPrev.bind(this)
	this.setPage = this.setPage.bind(this)
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
    
    getNext(){
	if(this.state.data["next"] != null){
	    var page = this.state.data["next"]
	    Promise.all([getData(this, this.props.filter, page)]);
	}
    }
    getPrev(){
	if(this.state.data["previous"] != null){
	    var page = this.state.data["previous"]
	    Promise.all([getData(this, this.props.filter, page)]);
	}
    }

    setPage(){

	
	var page_in = document.getElementById("page-input");
	var page_changed = page_in.value
	if(page_changed != null && page_changed != "" && page_changed > 0 ){
	    if(page_changed <= this.state.maxPage){
		console.log(page_in, page_changed)
		Promise.all([getData(this, this.props.filter, null, page_changed)])
	    }
	    else if(page_changed > this.state.maxPage){
		page_in.value = this.state.maxPage;
		Promise.all([getData(this, this.props.filter, null, page_in.value)])
	    }
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

	
	var points = [];
	var data = this.state.data.results;
	var lats_longs = [];
	var labels = [];
	console.log(data)
	for(var i = 0; i < data.length; i++){
	    var point_position = [data[i]["latitude"], data[i]["longitude"]]
	    var date = "Date: " + data[i].crimedate
	    var time = "Time: " + data[i].crimetime
	    var desc = "Description" + data[i].description
	    lats_longs.push(point_position);
	    points.push(
		<Marker position={point_position}>
		<Popup>
		    {date}
		{time}
		{desc}
		</Popup>
		</Marker>
	    )
	}
	console.log(points)
	if(lats_longs.length > 0){
	    var minPoint = lats_longs[0]
	    var maxPoint = lats_longs[lats_longs.length - 1]
	}
	else{
	    var maxPoint = [0, 0];
	    var minPoint = [0, 0];
	}
	console.log(minPoint, maxPoint);
	return (
		<React.Fragment>
		<h5 style={{"color":"black"}}>Pointmap</h5>
		
	        <Map center={position} zoom={this.state.zoom}>


		<TileLayer
	    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
	        />
		{points}
	    </Map>
		<div style={{"align": "left"}}>
		<div style={{"display": "flex"}}>
		<button onClick={this.getPrev}>Prev</button>
		<button onClick={this.getNext}>Next</button>
		<input id="page-input" onChange={this.setPage} style={{"width": "70px", "margin": "5px"}} type="number" min="1" max={this.state.maxPage} defaultValue="1"></input>
		<h6 style={{"padding": "2px"}}>/{this.state.maxPage}</h6>
		</div>
		<h6 style={{"font-size": "small", "padding": "2px", "float": "left"}}>Showing: Latitudes: ({minPoint[0]},{maxPoint[0]}), Longitudes: ({minPoint[1]},{maxPoint[1]}) </h6>
		</div>
		</React.Fragment>
	);
    }
    
}

function getData(obj, filter, page, page_changed){
    
    if(page == null){
	if(page_changed == null){
	    var url = allInstancesFetch + filter
	}
	else{
	    if(filter == "" || filter == null)
		var url = allInstancesFetch  + "?page=" + page_changed;
	    else{
		var url = allInstancesFetch  + filter + "&page=" + page_changed;
	    }
	}
    }
    else{
	var url = page
    }
    fetch(url, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
       }
 
    })
    .then((res) => res.json())
	.then(data => {
	    console.log(url)
	    
	    //calculate number of pages
	    var count = data["count"];
	    var page_num = Math.ceil(count/100);
	    var page_in = document.getElementById("page-input");
	    //if current url contains page, pull it out of the url
	    if(page_in != null && url.includes("page=")){
		var pre_page = url.split("page=")[1]
		var end = pre_page.indexOf("&")
		if(end == -1 || end == null)
		    end = pre_page.length
		page_in.value = parseInt(pre_page.substring(0, end));
	    }
	    //if current url does not contain page, we are on page 1
	    else if(page_in != null){
		page_in.value = 1;
	    }
	    obj.setState({ data : data,
			   ready: true,
			   maxPage: page_num
			 });
    });    
}
