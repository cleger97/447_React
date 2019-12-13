// Timeline 
import React, {Component} from 'react';
import ChartJS from 'chart.js'
import {Bar} from 'react-chartjs-2';

import {genRandColor} from './utility.js';
import { stringLiteral } from '@babel/types';


var simpleFetch = 'http://ec2-34-228-208-5.compute-1.amazonaws.com/date-count/?crimedate_gte=2014-01-01';

export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      data: [],
      colors: [],
      mean: 0,
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
    //console.log(this.state.keys);
    //console.log(this.state.data);

    //console.log(this.state.mean);
    var legendRed = " Red = above mean.";
    var legendBlue = " Blue = below mean.";
    var legend = (isNaN(this.state.mean)) ?  "No values." :  "Average crimes per month: " + Math.trunc(this.state.mean) + "." + legendRed + legendBlue;
    

    // TODO: set scale
    var data = {
      labels: this.state.keys,
      datasets: [{
        label: legend,
        data: this.state.data,
        backgroundColor: this.state.colors
      }]
    }
    var options = {
      maintainAspectRatio : false,
      legend: {
        //display: false
        labels: {
          boxWidth: 0
        }
      }
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
      //console.log(key);
      if (data[key] == null) { 
        for (var i = 1; i < 13; i++) {
          retKeys.push(key + " " + i);
          retData.push(0);
          //colorList.push(genRandColor(0.8));
        }
        return;
      }
      monthSet.forEach((key2, value2) => {

        //console.log(key2 + " " + data[key][key2]);
        var inKey = key + " " + key2;
        var inData = data[key][key2];
        
        retKeys.push(inKey);
        
        if (inData == null) {
          retData.push(0);
        } else {
          
          retData.push(inData);
        }

        //colorList.push(genRandColor(0.8));
      });
    });

    // calculate colors
    var total = 0, count = 0, avg = 0;
    var min = Number.MAX_SAFE_INTEGER, max = 0;
    retData.forEach((data) => {
      if (data == 0) {
        return;
      }
      total += data;
      count++;
      if (data < min) {
        min = data;
      } 
      if (data > max) {
        max = data;
      }
    });
    // calculate an average color
    avg = total / count;

    console.log(avg - min);

    var color = "rgb(0, 0, 0, 0.8)";
    var cVal = 0.0;
    retData.forEach((data) => {
      if (data === 0) {
        colorList.push("rgb(0, 0, 0, 0.8)");
        return;
      }

      var diff = data - min;

      //console.log(diff);

     
      /*
      cVal = (diff) / (max - min);
      
      cVal = (1 - cVal);
      console.log(cVal);
      cVal *= 255;
      cVal = Math.abs(Math.floor(cVal));

      //cVal = (cVal > 192) ? 192 : cVal;

      color = "rgba(255, " + cVal + ", " + cVal + ", 0.8)";

      colorList.push(color);
      */
      
      var justOneColor = false;
      var maxColor = 64;

      if (diff > (avg - min)) {
        // should be red

        // get on a scale from 0 to 1
        if (max !== min) {
          cVal = (data) / (max - min);

          // subtract the average.
          cVal -= (avg) / (max - min);
        }
        else {
          cVal = maxColor;
        }
        
        //console.log(cVal);
        // multiply by color
        cVal *= 255;

        // invert -> to get whiteness intensity
        cVal = (255 - cVal);
        cVal = Math.floor(cVal);

        if (justOneColor) {
          cVal = 0;
        }

        cVal = (cVal > maxColor) ? maxColor : cVal;

        color = "rgba(255, " + cVal + ", " + cVal + ", 0.8)";    

        //console.log(data + " " + avg + " " + cVal);
        colorList.push(color);
      } else {
        // blue.
        if (max !== min) {
          cVal = (data) / (max - min);

          // subtract the average.
          cVal += (avg) / (max - min);
        }
        else {
          cVal = maxColor;
        }

        //console.log(cVal);
        cVal *= 255;
        cVal *= -1;

        // invert -> should be white values
        cVal = (255 - cVal);

        cVal = Math.floor(cVal);

        // green
        // color = "rgba(" + cVal + ", 255 ," + cVal + ", 0.8)";

        if (justOneColor) {
          cVal = 0;
        }

        cVal = (cVal > maxColor) ? maxColor : cVal;

        color = "rgba(" + cVal + ", " + cVal + ", 255, 0.8)";

        //console.log(data + " " + avg + " " + cVal);
        colorList.push(color);
      } 
    });

    //console.log(colorList);
    obj.setState({ keys: retKeys, data: retData, colors: colorList, mean: avg, ready: true})
  });

  return null;
}