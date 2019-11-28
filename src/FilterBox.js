import React, {Component} from 'react';

var crimeColumnVals = ["weapon",  "crimecode", "description"]
var locationColumnVals = ["neighborhood", "post", "district", "premise", "location"]
var crimeFetch = "http://ec2-34-228-208-5.compute-1.amazonaws.com/crime-column-value/";
var locationFetch = "http://ec2-34-228-208-5.compute-1.amazonaws.com/location-column-value/";


export default class FilterBox extends Component {

    
    constructor(props){
	super(props);
    }

    render() {

	return (
      <React.Fragment>
        <h5> Filters  </h5>
        <div class = 'fill' id = 'filter-box'>
		<FilterList url={crimeFetch} column={crimeColumnVals[0]}>
		</FilterList>
        </div>
      </React.Fragment>)
    }
}

class FilterList extends Component {
    constructor(props, url, column){
	super(props);
	this.url = this.props.url;
	this.column = this.props.column;
	this.state = {
	    data: []
	};
	Promise.all([getData(this, this.url+"?column="+this.column)]);
    }

    render() {
	var dataValues = this.state.data;
	console.log("Here");
	console.log(dataValues);
	return (
		<React.Fragment>
		<select>
		<option value ={dataValues[0]}>
		</option>
		</select>
		</React.Fragment>
	)
    }
    
}

function getData(obj, url) {
  console.log("Fetching url: " + url);
  fetch(url, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
       }

    })
	.then((res) => {
	    return res.json();
    })
	.then(data => {
	    console.log("Got ", data);
      obj.setState({ data : data});
    });
}


