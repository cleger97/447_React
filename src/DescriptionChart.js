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
      var dataValues = this.state.data;
      var data = {
          labels: this.state.keys,
          datasets: [{
              data: this.state.data,
              backgroundColor: 'rgba(255, 99, 132, 0.2)'
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
		          display: false
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
