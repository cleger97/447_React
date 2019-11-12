import React, {Component} from 'react';

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
    return (
      <React.Fragment>
      <p> {this.state.data} </p>
      <p> {this.state.keys} </p>
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