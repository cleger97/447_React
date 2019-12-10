import React, {Component} from 'react';
import ChartJS from 'chart.js';
import {Line} from 'react-chartjs-2';

var timeFetch = 'http://ec2-34-228-208-5.compute-1.amazonaws.com/column-count/?column=crimetime';

export default class TimeChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      keys: [],
      data: []
    };
    
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

      if(this.state.ready == false){
	  return null;
      }
      
      
      var data = {
          labels: this.state.keys,
          datasets: [{
              data: this.state.data,
	      pointStyle: "line",
	      fill: false,
	      lineTension: 0,
	      borderColor: "#f00",
	      
          }]
      }
      
      var options = {
	  maintainAspectRatio : false,
	  scales: {
	      yAxes: [
		  {
		      ticks: {
			  min: 0,
			  stepSize: 1
		      }
		  }
	      ]
	  },
      }
      return (
	      <React.Fragment>
              <div class = 'fill'>
              <Line data = {data} options = {options} />
              </div>
	      </React.Fragment>
      );
  }
}

function getData(obj, filter){

    filter = filter.replace("?", "&");
    fetch(timeFetch + filter, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
       }
 
    })
    .then((res) => res.json())
    .then(data => {
	var keyVals = Object.keys(data);
	var values = Object.values(data);
	obj.setState({ data : values, keys : keyVals, ready: true});
    });    
}
