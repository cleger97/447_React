import React, {Component} from 'react';

var crimeFetch = "http://ec2-34-228-208-5.compute-1.amazonaws.com/crimeinstances/";

var columns = ["crimecode", "crimedate", "crimetime", "description", "district", "inside_outside", "latitude", "longitude", "location", "neighborhood", "post", "premise", "weapon"]
var column_headers = ["Code", "Date", "Time", "Description", "District", "Inside Outside", "Latitude", "Longitude", "Location", "Neighborhood", "Post", "Premise", "Weapon"]

export default class Table extends Component {

    constructor(props){
	super(props);
	this.state = {filter: "", ready: false, data: {}, keys: {}};
	this.getNext = this.getNext.bind(this)
	this.getPrev = this.getPrev.bind(this)
    }

    componentDidMount() {
	Promise.all([getData(this, this.props.filter)]);
    }
    
    componentDidUpdate(oldProps) {
	if (this.props.filter != oldProps.filter) {
	    this.setState({ data: {}, keys: {}, ready: false });
	    Promise.all([getData(this, this.props.filter)]);
	}
    }

    getNext(){
	console.log("Going to next page: ", this.state.data)
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
    
    render(){

	
	if(this.state.ready != true){
	    return null;
	}

	var headers = [];
	//build the headers
	for(var i = 0; i < column_headers.length; i++){
	    var curr_val = column_headers[i];
	    var h = <th>{curr_val}</th>
	    headers.push(h)
	}
	var thead =
	    <thead>
	    <tr>
	    {headers}
	    </tr>
	    </thead>

	//build the rows
	var rows=[];
	var results = this.state.data.results;
	for(var i = 0; i < results.length; i++){
	    var column_vals = [];


	    //build the columns
	    for(var j = 0; j < columns.length; j++){
		var curr_val = results[i][columns[j]];
		column_vals.push(<td>{curr_val}</td>)
	    }
	    var row =
		<tr>
		{column_vals}
		</tr>
		
	    rows.push(row);
	}
	
	return (
		<React.Fragment>
		<div class="col-md-12 table-outer">
		<button onClick={this.getPrev}>Prev</button>
		<button onClick={this.getNext}>Next</button>
		<div class = "table-holder" style={{"padding": "15px"}}>

		
		<table cellpadding="10" headerpadding="10">
		<tr>
		{thead}
	        {rows}
	        </tr>
	        </table>
		</div>
		</div>
		</React.Fragment>
	)
    }
    
}

function getData(obj, filter, page){

    if(page == null){
	var url = crimeFetch + filter;
    }
    else{
	var url = page;
    }
	
    fetch(url, {
	headers: {
	    'Content-Type': 'application/json',
	    'Accept': 'application/json',
	}
	
    })
	.then((res) => res.json())
	.then(data => {
	    obj.setState({
	    
		data: data,
		ready: true
	    });
	});
}
