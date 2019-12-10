import React, {Component} from 'react';
import ChartJS from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

var insideOutsideFetch = 'http://ec2-34-228-208-5.compute-1.amazonaws.com/column-count/?column=inside_outside';

export default class InOutChart extends Component {
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
              backgroundColor: [
		  'rgba(255, 64, 64, 0.8)',
		  'rgba(64, 64, 255, 0.8)'
              ]
          }]
      } 
      var options = {
	  maintainAspectRatio : false
      }
      return (
	      <React.Fragment>
              <div class = 'fill'>
              <Doughnut data = {data} options = {options}  />
              </div>
	      </React.Fragment>
      );
  }
}

function getData(obj, filter){

    filter = filter.replace("?", "&");
    fetch(insideOutsideFetch + filter, {
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
