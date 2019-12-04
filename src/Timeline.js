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
      colors: [],
      ready: false
    };
  }

  componentDidMount() {
    if (this.props.filter != null) {
      getSimpleFetch(this, this.props.filter);
    } else {
      getSimpleFetch(this, null);
    }
  }

  componentDidUpdate(oldProps) {
    if (this.props.filter != oldProps.filter) {
      this.setState({ data: [], keys: [], colors: [], ready: false });
      Promise.all([getSimpleFetch(this, this.props.filter)]);
    }
  }

  render () {
    if (this.state.ready == false) {
      return null;
    }
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



function getSimpleFetch(obj, filter) {
  var retKeys = [];
  var retData = [];
  var colorList = [];

  var yearSet = [];

  const monthSet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  var date = new Date();

  for (var i = 2014; i <= date.getFullYear(); i++) {
    yearSet.push(i);
  }

  filter = filter.replace("?", "&");

  fetch(simpleFetch + filter, {
    headers : {
      'Content-Type': 'application/json', 
      'Accept': 'application/json',
    }
  }).then((res) => {
    return res.json();
  }).then(data => {
    //console.log(data);
    //console.log(Object.keys(data));

    yearSet.forEach((key) => {
      console.log(key);
      if (data[key] == null) { 
        for (var i = 1; i < 13; i++) {
          retKeys.push(key + " " + i);
          retData.push(0);
          colorList.push(genRandColor(0.8));
        }
        return;
      }
      monthSet.forEach((key2, value2) => {

        console.log(key2 + " " + data[key][key2]);
        var inKey = key + " " + key2;
        var inData = data[key][key2];
        
        retKeys.push(inKey);
        
        if (inData == null) {
          retData.push(0);
        } else {
          retData.push(inData);
        }

        colorList.push(genRandColor(0.8));
      });
    });

    obj.setState({ keys: retKeys, data: retData, colors: colorList, ready: true})
  });

  return null;
}