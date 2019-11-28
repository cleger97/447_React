import React, {Component} from 'react';

var crimeColumnVals = ["weapon",  "crimecode", "description"]
var locationColumnVals = ["neighborhood", "post", "district", "premise", "location"]
var crimeFetch = "http://ec2-34-228-208-5.compute-1.amazonaws.com/crime-column-value/";
var locationFetch = "http://ec2-34-228-208-5.compute-1.amazonaws.com/location-column-value/";


export default class FilterBox extends Component {

    
    constructor(props){
	super(props);
	this.state = {
	    ready : false
	}
	
    }

    componentDidMount(){

	this.componentList = [
		<FilterList url={crimeFetch} column={crimeColumnVals[0]} label="Weapons">
		</FilterList>,
		<FilterList url={crimeFetch} column={crimeColumnVals[1]} label="Crimecode">
		</FilterList>,
		<FilterList url={crimeFetch} column={crimeColumnVals[2]} label="Description">
		</FilterList>,
		<FilterList url={locationFetch} column={locationColumnVals[0]} label="">
		</FilterList>,
		<FilterList url={locationFetch} column={locationColumnVals[1]} label="">
		</FilterList>,
		<FilterList url={locationFetch} column={locationColumnVals[2]} label="">
		</FilterList>,
		<FilterList url={locationFetch} column={locationColumnVals[3]} label="">
		</FilterList>,
		<FilterList url={locationFetch} column={locationColumnVals[4]} label="">
		</FilterList>,
]

	this.setState({ready:true});
    }

    render() {

	if (this.state.ready == false){
	    return null;
	}
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
	this.url = this.props.url;
	this.column = this.props.column;
	this.label = this.props.label;
	this.state = {
	    data: [],
	    dataFetched: false
	};
    }

    componentDidMount(){
	getData(this, this.url+"?column="+this.column);
    }

    render() {
	if(this.state.dataFetched == false) {
	    return null
	}
	
	var dataValues = this.state.data;

	var options = [];
	var arrayLength = dataValues.length;
	for (var i = 0; i < arrayLength; i++) {
	    options.push((<FilterItem label={dataValues[i]}></FilterItem>));
	    //Do something
	}
	console.log(options);
	console.log("Here");
	console.log(dataValues);
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
	    obj.setState({ data : data,
			   dataFetched: true});
    });
}


