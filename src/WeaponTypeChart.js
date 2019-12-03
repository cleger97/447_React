import React, {Component} from 'react';
import ChartJS from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

var weaponFetch = "http://ec2-34-228-208-5.compute-1.amazonaws.com/column-count/?column=weapon";

export default class WeaponTypeChart extends Component {
    constructor(props) {
	super(props);
	
	this.state = {
	    keys: [],
	    data: [],
	    ready: false
	};
    }
    
    componentDidMount() {
	Promise.all([loadWeapons(this, this.props.filter)]);
    }
    
    componentDidUpdate(oldProps){
	if(this.props.filter != oldProps.filter){
	    this.setState({data: {}, keys: {}, ready: false});
	    Promise.all([loadWeapons(this, this.props.filter)]);
      }
    }
    
    render() {
	
	if(this.state.ready == false){
	    return null;
	}
	var dataValues = this.state.data;
	var data = {
            labels: this.state.keys,
            datasets: [{
		data: this.state.data,
            }]
	} 
	var options = {
	    maintainAspectRatio : false
	}
    
	return (
		<React.Fragment>
		<div class = 'fill'>
		<Doughnut data = {data} options = {options} redraw />
		</div>
		</React.Fragment>
	);
    }
}


function loadWeapons(obj, filter) {
    filter = filter.replace("?", "&");
    fetch(weaponFetch + filter, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
       }
 
    })
    .then((res) => res.json())
    .then(data => {
      var keyVal = Object.keys(data);
      var values = Object.values(data);

      obj.setState({
        keys : keyVal,
          data: values,
	  ready: true
      });
    }); 
}
