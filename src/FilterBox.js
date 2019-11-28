import React, {Component} from 'react';

var crimeColumnVals = ["weapon",  "crimecode", "description"]
var locationColumnVals = ["neighborhood", "post", "district", "premise", "location"]
var crimeFetch = "http://ec2-34-228-208-5.compute-1.amazonaws.com/crime-column-value/";
var locationFetch = "http://ec2-34-228-208-5.compute-1.amazonaws.com/location-column-value/";

async function getAllFilters(){
    var filtersList = [];
    for(var i = 0; i < crimeColumnVals.length; i++){
	await getData(filtersList, crimeFetch+"?column="+crimeColumnVals[i]);
    }
    console.log("Got", filtersList);
    return filtersList;
}

export default class FilterBox extends Component {

    
    constructor(props){
	super(props);
	this.state = {
	    ready : false,
	    data: null
	}
	
    }

    componentDidMount(){
	Promise.all([getAllFilters()]).then((filtersList) => {this.setState({ready: true, data: filtersList})});
	
	
    }

    render() {

	if (this.state.ready == false){
	    return null;
	}

	console.log(this.state.data[0])
	this.componentList = [
		<FilterList data={this.state.data[0][0]} label="Weapons">
		</FilterList>,
	    <FilterList data={this.state.data[0][1]} label="Weapons">
		</FilterList>,
	    <FilterList data={this.state.data[0][2]} label="Weapons">

	    </FilterList>];
	/**
		<FilterList url={locationFetch} column={locationColumnVals[0]} label="">
		</FilterList>,
		<FilterList url={locationFetch} column={locationColumnVals[1]} label="">
		</FilterList>,
		<FilterList url={locationFetch} column={locationColumnVals[2]} label="">
		</FilterList>,
		<FilterList url={locationFetch} column={locationColumnVals[3]} label="">
		</FilterList>,
		]
**/
	
	
	return (
      <React.Fragment>
        <h5> BTW - Please dont branch  </h5>
        <div class = 'fill' id = 'filter-box'>

	    {this.componentList}
	</div>
      </React.Fragment>)
    }
}

class FilterList extends Component {
    constructor(props, url, column){
	super(props);
	this.label = this.props.label;
	this.state = {
	};
    }

    componentDidMount(){
	
    }

    render() {
		
	var options = [];
	console.log("Making filters out of ", this.props.data);
	for (var i = 0; i < this.props.data.length; i++) {
	    options.push((<FilterItem label={this.props.data[i]}></FilterItem>));
	}
	console.log(options);
	console.log("Here");
	return (
		<React.Fragment>
		<select multiple>
		{options}
		</select>
		</React.Fragment>
	)
    }
    
}

class FilterItem extends Component {
    constructor(props){
	super(props);
	this.label = this.props.label;
    }
    render(){
	return (
		<option value={this.label}>{this.label}
	        </option>
	);
    }
}

async function getData(obj, url) {
  console.log("Fetching url: " + url);
  await fetch(url, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
       }

    })
	.then((res) => {
	    return res.json();
    })
	.then(data => {
	    obj.push(data);
    });
}


