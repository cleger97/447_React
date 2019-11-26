// Timeline 
import React, {Component} from 'react';
import ChartJS from 'chart.js'
import {Bar} from 'react-chartjs-2';

import {genRandColor} from './utility.js';

var simpleFetch = 'http://ec2-34-228-208-5.compute-1.amazonaws.com/date-count/?crimedate_gte=2014-01-01';

export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      data: [],
      colors: []
    };
    getSimpleFetch(this);
  }

  render () {
    console.log(this.state.keys);
    console.log(this.state.data);

    var data = {
      labels: this.state.keys,
      datasets: [{
        data: this.state.data,
        backgroundColor: this.state.colors
      }]
    }
    var options = {
      maintainAspectRatio : false
    }


    return (
      <React.Fragment>
        <h5> Timeline </h5>
        <div class = 'fill'>
          <Bar data = {data} options = {options} redraw />
        </div>


      </React.Fragment>

    )

    //return null;
  }
}



function getSimpleFetch(obj) {
  var retKeys = [];
  var retData = [];
  var colorList = [];

  fetch(simpleFetch, {
    headers : {
      'Content-Type': 'application/json', 
      'Accept': 'application/json',
    }
  }).then((res) => {
    return res.json();
  }).then(data => {
    console.log(data);
    console.log(Object.keys(data));
    Object.keys(data).forEach((key, value) => {
      console.log(key);
      Object.keys(data[key]).forEach((key2, value2) => {
        console.log(key2 + " " + data[key][key2]);
        var inKey = key + " " + key2;
        var inData = data[key][key2];
        retKeys.push(inKey);
        retData.push(inData);
        colorList.push(genRandColor());
      });
    });

    obj.setState({ keys: retKeys, data: retData, colors: colorList})
  });

  return null;
}