import React, {Component} from 'react';
import NumberOccurenceChart from './NumberOccurenceChart'

var inputData;

export default class DataHandle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jsonExists: false,
      jsonKeys: [],
      jsonData: []
    };

    fetch('./data/response.json', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }

    })
    .then((res) => {
      return res.json()
    })
    .then(data => {
      //console.log(data);
      //console.log(data.results);
      //console.log(data.results[0]);
      //console.log(Object.keys(data).length);
      //console.log(data.results.length);
      this.setState({ 
        jsonExists: (data !== null && data.constructor == Object && data.results.length > 0),
        jsonKeys: (data !== null && data.constructor == Object && data.results.length > 0) ? Object.keys(data.results[0]) : [], 
        jsonData: data });
    });
  }

  render() {
    // should change this to props.key at some point
    // console.log(this.state.jsonData);
    //console.log(this.state.jsonKeys);
    var array = this.state.jsonData;
    var occurData = [];
    var occurData2 = [];
    //console.log(array);
    if (this.state.jsonExists) {
      occurData = countData('inside_outside', this.state.jsonData.results);

      occurData2 = countData('weapon', this.state.jsonData.results);
      //console.log(occurData);
    }

    console.log(occurData);
    //console.log(this.state.jsonKeys);
    //console.log(this.state.jsonData);

    return (
      <div>
        <NumberOccurenceChart chartInfo = 'inside_outside' data = {occurData} />
        <NumberOccurenceChart chartInfo = 'weapon' data = {occurData2} />
      </div>
    );
  }
}

// typeData -> a string representing the searched data, dataList is the data result object
function countData(typeData, dataList) {
  var ret = [];
  // so far, only supports counting values...
  for (var index = 0; index < dataList.length; index++) {
    var dataVal = dataList[index];

    var isKeyExist = false;
    var indexLoc = -1;
    for (var key in ret) {
      //console.log(key);
      if (ret[key].type === dataVal[typeData]) {
        isKeyExist = true;
        indexLoc = key;
        //console.log("Found key");
      }
    }

    if (ret !== undefined && isKeyExist) {
      //console.log("Adding old value");
      ret[indexLoc].y++;
    } else {
      //console.log("Adding new value");
      ret.push( {y: 1, type: dataVal[typeData] } ) 
      //ret[dataVal[typeData]] = 1;
    }
  }
  

  return ret;
}


