import React, {Component} from 'react';
import ChartJS from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

var insideFetch = 'http://ec2-34-228-208-5.compute-1.amazonaws.com/count/?inside_outside=Inside';
var outsideFetch = 'http://ec2-34-228-208-5.compute-1.amazonaws.com/count/?inside_outside=Outside';


export default class InOutChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jsonExists: false,
      keys: ["inside", "outside"],
      data: [0, 0]
    };
    Promise.all([getInside(this), getOutside(this)]);
    
  }

  render() {
    var dataValues = this.state.data;
    var data = {
        labels: this.state.keys,
        datasets: [{
          data: this.state.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ]
        }]
      } 
    var options = {
      maintainAspectRatio : false
    }
    return (
      <React.Fragment>
        <h5> Crimes by Location </h5>
        <div class = 'fill'>
          <Doughnut data = {data} options = {options}  />
        </div>
      
    

      </React.Fragment>
    );
  }
}


function getInside(obj) {
  var inside = 0;
  var isDone = false;
  fetch(insideFetch, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
       }
 
    })
    .then((res) => res.json())
    .then(data => {
      console.log(data);
      inside = data;
      obj.setState({ data : [inside, obj.state.data[1]]});
    });
    
}

function getOutside(obj) {
  var outside;
  fetch(outsideFetch, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
       }

    })
    .then((res) => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      outside = data;
      obj.setState({ data : [obj.state.data[0], outside]});
    });
    return outside;
}
