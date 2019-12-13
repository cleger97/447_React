import React, {Component} from 'react';
import ChartJS from 'chart.js';
import {Bar} from 'react-chartjs-2';

var descriptionFetch = 'http://ec2-34-228-208-5.compute-1.amazonaws.com/column-count/?column=description';

export default class DescriptionChart extends Component {
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
      
      //start color is the blue value in array so can be calculated
      var startColor = [64, 64, 255, 0.8];
      //use this as last element
      var endColor = "rgba(255, 64, 64, 0.8)";

      var colors = [];
      //calculate color gradient based on amount of items
      if(this.state.keys.length > 0){
	  var newGrad = (255 - 64) / this.state.keys.length;
      }

      for(var i = 0; i < this.state.keys.length; i++){
	  //last itemis the pure red color of our schema
	  if(i + 1 == this.state.keys.length){
	      colors.push(endColor);
	  }
	  //calculate new color based on gradient
	  else{
	      var newB = Math.floor(startColor[2] - newGrad * i);
	      var newR = Math.floor(startColor[1] + newGrad * i);
	      colors.push("rgba(" + [newR, 64, newB, 0.8].join() + ")");
	  }
      }
      
      
      var data = {
          labels: this.state.keys,
          datasets: [{
              data: this.state.data,
              backgroundColor: colors
          }]
      }
      
      var options = {
	  maintainAspectRatio : false,
	  scales: {
	      xAxes: [
		  {
		      ticks: {
			  fontSize: 9,
			  fontColor: "black",
		      }
		  }
	
	      ],
	      yAxes: [
		  {
		      ticks: {
		          display: true
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
              <Bar data = {data} options = {options} />
              </div>
	      </React.Fragment>
      );
  }
}

function getData(obj, filter){

    filter = filter.replace("?", "&");
    fetch(descriptionFetch + filter, {
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
