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
	      pointStyle: "circle",
	      fill: false,
	      lineTension: 0,
	      borderColor: "#f00",
          }]
      }
      
      var options = {
	  maintainAspectRatio : false,
	  scales: {
	      xAxes:[{
		  distribution: "linear",
		  type: 'time',
		  time: {
		      unit: "hour",
		      unitStepSize: 1,
		      displayFormats: {
			  second: 'h:mm:ss',
		      }
		  }
	      }]
	      ,
	      yAxes: [
		  {
		      ticks: {
			  min: 0,
			  stepSize: 1
		      }
		  }
	      ]
	  },
	  legend: {
	      display: false,
	  }
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
	    var labels = [];
	    //create new time labels with correct hour but arbitrary date (unused)
	    for(var i = 0; i < 24; i++){
		labels.push(new Date("2000", "01", "01", i.toString(), "00", "00"))
	    }
	    //placeholder of 0 for unused times
	    var labelData = new Array(24).fill(0);
	    
	    var values = Object.values(data);
	    var dateValues = [];
	    //add up all the times by hour into their resepctive hour bucket
	    for(var i = 0; i < keyVals.length; i++){
		
		var splitStr = keyVals[i].split(":")
		var dateTime = new Date("2000", "01", "01", splitStr[0], splitStr[1], splitStr[2]);
		labelData[dateTime.getHours()] += values[i];
		dateValues.push(dateTime);
	    }
	    obj.setState({ data : labelData, keys : labels, ready: true});
    });    
}
