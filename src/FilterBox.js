import React, {Component} from 'react';

var crimeColumnVals = ["weapon",  "crimecode", "description"]
var locationColumnVals = ["neighborhood", "post", "district", "premise", "location"]
var locationFetch = "http://ec2-34-228-208-5.compute-1.amazonaws.com/crime-column-value/";
var locationFetch = "http://ec2-34-228-208-5.compute-1.amazonaws.com/location-column-value/";


export default class FilterBox extends Component {
    

    render() {

	return (
      <React.Fragment>
        <h5> Crimes by Location </h5>
        <div class = 'fill'>
	<h1>Hi from peter {this.props.name}</h1>
        </div>
      </React.Fragment>)
    }
}


