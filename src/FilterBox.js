import React, {Component} from 'react';

var crimeColumnVals = ["weapon", "description"]
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
	
	//must bind the component functions to the current instance of the class
	this.filterSelected = this.filterSelected.bind(this);
	this.clearAll = this.clearAll.bind(this);
	this.currentFilters = {};
	this.removeFilter = this.removeFilter.bind(this);
    }

    componentDidMount(){
	Promise.all([getAllFilters()]).then((filtersList) => {this.setState({ready: true, data: filtersList})});
    }

    updateCharts(newFilter){
	this.props.updateFilter(newFilter);
    }

    removeFilter(event){
	var tableScroll = document.getElementById("filter-show-scroll");
	console.log(event);
	tableScroll.removeChild(event.target);
	console.log(event)

	var curr_sel = document.getElementById(event.target.filterid);
	if(curr_sel == null && event.target.filterid == "crimetime_range"){
	    curr_sel = document.getElementsByClassName("time-select")
	}
	if(curr_sel == null && event.target.filterid == "crimedate_range"){
	    curr_sel = document.getElementsByClassName("date-select")
	}
	
	if(event.target.filterid == "crimetime_range" || event.target.filterid == "crimedate_range"){
	    curr_sel[0].value = ""
	    curr_sel[1].value = ""
	}else{
	    console.log("Currsel ", curr_sel)
	    for(var i = 0; i < curr_sel.options.length; i++){
		console.log(curr_sel.options[i].value, event.target.value);
		if(curr_sel.options[i].value == event.target.value){
		    curr_sel.options[i].selected = false;
		}
	    }
	}
	
	if(!(tableScroll.firstChild)){
	    var table = document.getElementById("filter-show");
	    console.log("TABLE ", table);
	    table.setAttribute('hidden', "");
	}

	this.filterSelected();
    }

    filterSelected(){
	console.log("Filters changed");

	//get the values from the selects
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
	var queryString = buildQueryString(queryParams);

	//get the values from the min and max time
	var timeSelects = document.getElementsByClassName("time-select");
	var newFilter = getTimeValues(timeSelects);
	if(newFilter && queryString){
	    queryString = queryString + "&" + newFilter;
	    allFilters.push(newFilter);
	} else if(newFilter && !queryString){
	    queryString = "?" + newFilter;
	    allFilters.push(newFilter);
	}

	//get the values from the min and max date
	var dateSelects = document.getElementsByClassName("date-select");
	var newFilter = getDateValues(dateSelects);
	if(newFilter && queryString){
	    queryString = queryString + "&" + newFilter;
	    allFilters.push(newFilter);
	} else if(newFilter && !queryString){
	    queryString = "?" + newFilter;
	    allFilters.push(newFilter);
	}
	
	console.log("Built query: ", queryString);
	console.log("With filters: ", allFilters);

	//setup the clear filter table
	if(queryString){
	    var table = document.getElementById("filter-show");
	    table.removeAttribute('hidden');
	    var tableScroll = document.getElementById("filter-show-scroll");
	    
	    //remove all the previous buttons
	    while (tableScroll.firstChild) {
		tableScroll.removeChild(tableScroll.firstChild);
	    }
	    for(var i = 0; i < allFilters.length; i++){
		//found list box element, parse individually
		if(typeof allFilters[i] != "string"){
		    
		    var values = allFilters[i].filters
			    
		    for(var j = 0; j < values.length; j++){
			var element = document.createElement("button");
			element.classList.add("filter-show-button");
			element.innerHTML = allFilters[i].column + ": " + values[j];
			element.filterid = allFilters[i].column
			element.value = values[j];
			element.addEventListener('click', this.removeFilter, {once: true});
			tableScroll.appendChild(element);
		    }
		    
		}else{
		    //found time slot element, parse as a whole min-max
		    var element = document.createElement("button");
		    element.classList.add("filter-show-button");
		    element.innerHTML = allFilters[i].split("=").join(": ");
		    element.filterid = allFilters[i].split("=")[0];
		    element.value = allFilters[i].split("=")[1];
		    element.addEventListener('click', this.removeFilter);
		    tableScroll.appendChild(element);
		}
	    }
	    
	} else{
	    var table = document.getElementById("filter-show");
	    console.log("TABLE ", table);
	    table.setAttribute('hidden', "");
	    
	}
	this.props.update(queryString);
    }

    //clearAll function
    //
    //Used as a callback on the clear filters button to clear all the filters and reset the views
    clearAll(){
	var cleared = false
	
	var selects = document.getElementsByClassName("filter-select");
	for(var i = 0; i < selects.length; i++){
	    if(selects[i].value != ""){
		cleared = true;
	    }
	    selects[i].value = "";
	}

	var times = document.getElementsByClassName("time-select");
	for(var i = 0; i < times.length; i++){
	    if(times[i].value != ""){
		cleared = true;
	    }
	    times[i].value = "";
	}

	var dates = document.getElementsByClassName("date-select");
	for(var i = 0; i < dates.length; i++){
	    if(dates[i].value != ""){
		cleared = true;
	    }
	    dates[i].value = "";
	}
	
	//Only update filters if a value has been cleared
	if(cleared)
	    this.filterSelected();
    }

    //render function
    //
    //Used to render all of the html and react components that handle the filtering
    render() {

	if (this.state.ready == false){
	    return(
		    <React.Fragment><div class="fill">
		    <div class="loader"></div>
		    </div>
		    </React.Fragment>
	    )
	}

	console.log(this.state.data[0])
	this.componentList = [
		<FilterList data={this.state.data[0][0][0]} label={this.state.data[0][0][1]} update={this.filterSelected}>
		</FilterList>,
	    <FilterList data={this.state.data[0][1][0]} label={this.state.data[0][1][1]} update={this.filterSelected}>
		</FilterList>,
	    <FilterList data={this.state.data[0][2][0]} label={this.state.data[0][2][1]} update={this.filterSelected}>
		</FilterList>,
	    <FilterList data={this.state.data[0][3][0]} label={this.state.data[0][3][1]} update={this.filterSelected}>
		</FilterList>,
	    <FilterList data={this.state.data[0][4][0]} label={this.state.data[0][4][1]} update={this.filterSelected}>
		</FilterList>,
	    <FilterList data={this.state.data[0][5][0]} label={this.state.data[0][5][1]} update={this.filterSelected}>
		</FilterList>,

	<h6 class="small-label">Min-Max Time</h6>,
		<div class="aligned">

	    <input id="max-time" class="time-select" type="time" onChange={this.filterSelected}>
		</input>
	    <input id="min-time" class="time-select" type="time" onChange={this.filterSelected}>
 		</input>

	    </div>,

		<h6 class="small-label" >Min-Max Date</h6>,
		<div class="aligned">

		<input id="max-date" class="date-select" type="date" min="2014-01-01" max={getCurrentDateStr()} onChange={this.filterSelected}>
		</input>
		<input id="min-date" class="date-select" type="date" min="2014-01-01" max={getCurrentDateStr()} onChange={this.filterSelected}>
 		</input>

	    </div>,
		
 		
		<div id="filter-show" hidden>
		<h6 class="small-label">Current Filters:</h6>
		<div id="filter-show-scroll" style={{height: "100px"}} data={this.currentFilters}><button></button> </div>
		</div>,
	    <button onClick={this.clearAll} class='clear-button'>Clear Filters
	    </button>,
		
	];

	return (
		<React.Fragment>

        <div class = 'fill' id = 'filter-box'>
		<h5 id="filter-title">Filters</h5>
	    {this.componentList}
	    </div>
      </React.Fragment>)
    }
    
}

function getCurrentDateStr(){

    var curr = new Date();

    var year = curr.getFullYear();
    var month = curr.getMonth();
    var day = curr.getDate();

    return [year, day, month].join("-")
    
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
	for (var i = 0; i < this.props.data.length; i++) {
	    options.push((<FilterItem label={this.props.data[i]}></FilterItem>));
	}

	var title = titleCase(this.label);
	
	return (
		<React.Fragment>
		<h6 class="filter-label">{title}</h6>
		<select class="filter-select" size="4" id={this.label} onChange={this.props.update}  name={this.label} multiple>
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
    if(params){
	for(var i = 0; i < params.length; i++){
	    console.log("Current parameter: ", params[i]);
	    params[i] = sanitizeParam(params[i]);
	    console.log(params[i]);
	}

	
	var queryString = "?" + params.join("&");
	return queryString;
    }
    else{
	return "";
    }
}

function getTimeValues(time){
    var label = "crimetime_range";
    var minInput = time[0].value;
    var maxInput = time[1].value;
    
    if (minInput && maxInput) {
	var min = minInput + ":00";
	var max = maxInput + ":00"
    } else if(minInput) {
	var min = minInput + ":00";
	var max = "23:59:59";
    } else if(maxInput) {
	var min = "00:00:00";
	var max = maxInput + ":00";
    } else {
	return null;
    }

    var minDate = Date.parse("1/1/2019 " + min);
    var maxDate = Date.parse("1/1/2019 " + max);

    //reset min to max if it is greater than max
    if(minDate > maxDate){
	console.log("Resetting min");
	time[0].value = maxInput;
	min = max;
    }


    var time_range = min + "," + max
    return label+"="+time_range;
}

function getDateValues(date){
    var label = "crimedate_range";
    var minInput = date[0].value;
    var maxInput = date[1].value;

    console.log("Min and max date values: ", minInput, " - - ", maxInput)
    
    if (minInput && maxInput) {
	var min = minInput;
	var max = maxInput;
    } else if(minInput) {
	var min = minInput;
	var max = getCurrentDateStr();

    } else if(maxInput) {
	var min = new Date(2014, 1, 1);
	min = min.getFullYear() +  "-" + min.getMonth() + "-" + min.getDate() 
	var max = maxInput;
    } else {
	return null;
    }

    
    var date_range = min + "," + max
    console.log("Built this date filter: ", date_range)
    return label+"="+date_range;
}

function sanitizeParam(param){
    //hacky and slow, should be replaced with regular expression for
    //speed
    param = param.split("&").join("%26");
    return param;
}
