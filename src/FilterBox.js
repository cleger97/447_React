import React, {Component} from 'react';

var crimeColumnVals = ["weapon",  "crimecode", "description"]
var locationColumnVals = ["neighborhood", "post", "district", "premise"]
var crimeFetch = "http://ec2-34-228-208-5.compute-1.amazonaws.com/crime-column-value/";
var locationFetch = "http://ec2-34-228-208-5.compute-1.amazonaws.com/location-column-value/";

async function getAllFilters(){
    var filtersList = [];
    for(var i = 0; i < crimeColumnVals.length; i++){
	await getData(filtersList, crimeFetch, crimeColumnVals[i]);
    }
    for(var i = 0; i < locationColumnVals.length; i++){
	await getData(filtersList, locationFetch, locationColumnVals[i]);
    }
    
    console.log("Got", filtersList);
    return filtersList;
}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
	// You do not need to check if i is larger than splitStr length, as your for does that for you
	// Assign it back to the array
	splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
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
		<FilterList data={this.state.data[0][0][0]} label={this.state.data[0][0][1]}>
		</FilterList>,
	    <FilterList data={this.state.data[0][1][0]} label={this.state.data[0][1][1]}>
		</FilterList>,
	    <FilterList data={this.state.data[0][2][0]} label={this.state.data[0][2][1]}>
		</FilterList>,
	    <FilterList data={this.state.data[0][3][0]} label={this.state.data[0][3][1]}>
		</FilterList>,
	    <FilterList data={this.state.data[0][4][0]} label={this.state.data[0][4][1]}>
		</FilterList>,
	    <FilterList data={this.state.data[0][5][0]} label={this.state.data[0][5][1]}>
		</FilterList>,
	    <FilterList data={this.state.data[0][6][0]} label={this.state.data[0][6][1]}>
		</FilterList>,
	];
	
	return (
      <React.Fragment>
		<h5> Filters:  </h5>
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

	var title = titleCase(this.label);
	console.log(options);
	console.log("Here");
	return (
		<React.Fragment>
		<h6 class="filter-label">{title}</h6>
		<select class="filter-select" size="3" onChange={filterSelected} name={this.label} multiple>
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

async function getData(obj, url, column) {
  console.log("Fetching url: " + url + "?column=" + column);
  await fetch(url+"?column="+column, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
       }

    })
	.then((res) => {
	    return res.json();
    })
	.then(data => {
	    obj.push([data, column]);
    });
}

function filterSelected(){
    console.log("Filters changed");
    var filterSelects = document.getElementsByClassName("filter-select");
    var allFilters = [];
    for(var i = 0; i < filterSelects.length; i++){
	
	var newFilter = getSelectValues(filterSelects[i]);
	if(newFilter)
	    allFilters.push(newFilter);	
    }
    if(allFilters.length > 0){
	var queryParams = buildQueryParams(allFilters);
    }
    console.log(buildQueryString(queryParams));
}
function getSelectValues(select) {
    var result = []
    var label = select.name;
    var options = select && select.options;
    var opt;

    for (var i=0, iLen=options.length; i<iLen; i++) {
	opt = options[i];

	if (opt.selected) {
	    result.push(opt.value || opt.text);
	}
    }
    if(result.length == 0){
	return null
    }
    return {column: label, filters: result};
}

function buildQueryParams(filters){
    var queryparams = [];
    for(var i = 0; i < filters.length; i++){
	var currFilters = filters[i].filters.join();
	var param = filters[i].column + "=" + currFilters;
	queryparams.push(param);
    }
    return queryparams;
    
}

function buildQueryString(params){
    return params.join("&");
}
