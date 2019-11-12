import React, {Component} from 'react';
import CanvasJSReact from './canvasjs.react.js';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class NumberOccurenceChart extends Component {
  constructor(props){
    super(props);
  }

  render() {
    var options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", //"light1", "dark1", "dark2"
			title:{
				text: "Number Occurence Chart: " + this.props.chartInfo
			},
			data: [{
        type: "pie", //change type to bar, line, area, pie, etc
        startAngle: 0,
				indexLabel: "{type}: {y}", //Shows y value on all Data Points
				indexLabelFontColor: "#5A5757",
        
				dataPoints: this.props.data
			}]
		}

    return (
      <div> 
        <CanvasJSChart options = {options} />
      </div>
    )
  }


  
}