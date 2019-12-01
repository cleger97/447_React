import React, {Component} from 'react';
import ChartJS from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

// weapon list fetch
var weaponFetch = "http://ec2-34-228-208-5.compute-1.amazonaws.com/column-count/?column=weapon";
// count of weapon fetch
// append key to end
var countFetch = "http://ec2-34-228-208-5.compute-1.amazonaws.com/column-count/?column=weapon";

export default class WeaponTypeChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keys: [],
	data: [],
	ready: false
    };

    return;
    
  }

  componentDidMount() {
      Promise.all([loadWeapons(this, this.props.filter)]);
  }
    componentDidUpdate(oldProps){
	if(this.props.filter != oldProps.filter){
	    console.log("Found new filter: ", this.props.filter);
	    Promise.all([loadWeapons(this, this.props.filter)]);
	}
    }

    render() {

	if(this.state.ready == false){
	    return null;
	}
    console.log(this.state.data);
    console.log(this.state.keys);

    var dataValues = this.state.data;
    var data = {
        labels: this.state.keys,
        datasets: [{
          data: this.state.data,
        }]
      } 
    var options = {
      maintainAspectRatio : false
    }
    
    return (
      <React.Fragment>
        <div class = 'fill'>
          <Doughnut data = {data} options = {options} redraw />
        </div>
      </React.Fragment>
    );
  }
}


function loadWeapons(obj, filter) {
    console.log("Getting weapon list");
    filter = filter.replace("?", "&")
    obj.setState({data: {}, keys: {}, ready: false});
    fetch(weaponFetch + filter, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
       }
 
    })
    .then((res) => res.json())
    .then(data => {
      //obj.setState({keys : data});
      console.log(obj.state.keys);
      
      var keyVal = Object.keys(data);
      var values = Object.values(data);

      obj.setState({
        keys : keyVal,
          data: values,
	  ready: true
      });

      console.log(keyVal);
      console.log(values);
      
      //enumerateData(obj, data);
    }); 
}

function enumerateData(obj, keys) {
  var values = [];
  console.log("Enumerating data");
  var count = 0;

  var i = 0;
  var fetchNext = function() {  var toApp = keys[i];
    var toFetch = countFetch.concat(toApp);

    //console.log(toFetch);

    fetch(toFetch, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }

    })
    .then((res) => res.json())
    .then(data => {
      values.push(data);
	obj.setState({data: values});
      
      //console.log(obj.state.data);
      i++;
      if (i < keys.length) {
        fetchNext();
      }
    }); 
  }

  fetchNext();

  return;
}
