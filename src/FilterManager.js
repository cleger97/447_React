import React, {Component} from 'react';
import FilterBox from './FilterBox';
import InOutChart from './InOutChart'
import WeaponTypeChart from './WeaponTypeChart'
import HeatMap from './heatmap';
import Timeline from './Timeline';
import DescriptionChart from './DescriptionChart'
import TimeChart from './TimeChart'
import image from './assets/flag.jpg'

export default class FilterManager extends Component {

    constructor(props){
	super(props);
	this.state = {filter: ""};

	this.updateFilter = this.updateFilter.bind(this);
    }

    updateFilter(newFilter){
	console.log("Found new filter: ", newFilter);
	this.setState({filter: newFilter});
    }

    switchMapType(){
	
    }

    render(){
	return (<React.Fragment>
		<div class = 'mw-100 test bar' id="header-div">
      <img src= {require('./assets/flag.jpg')} height="100%" width = "300px" style = {{float: "right"}}></img>
		  <h1 class="header" style={{"font-size": "48px"}}>Touch Point Baltimore</h1>
		  <h1 class="header" style={{"font-size": "28px", "padding-left": "8px"}}>Crime Data Visualizer</h1>
		</div>

		<div id="dataForm" class="col-md-2 test side">
		<FilterBox update={this.updateFilter}></FilterBox>
		</div>

		<div id = "timeline" class = "col-md-10 test box">
		<Timeline filter={this.state.filter} />
		</div>

		<div class = "row test">
		    <div class = "col-md-6">
		   <div class = "row">
		    <div id="inoutchart" class="col-md-6 test box">
		        <h5> Crimes by Location </h5>
		        <InOutChart filter={this.state.filter}></InOutChart>
                </div>
		
		<div id="descriptionchart" class="col-md-6 test box">
		<h5> Crimes by Type </h5>
		<DescriptionChart filter={this.state.filter}></DescriptionChart>
		</div>

		</div>
		<div class = "row">
		
		<div id="timechart" class="col-md-6 test box">
		<h5> Crimes by Time of Day </h5>
		<TimeChart filter={this.state.filter}></TimeChart>
		</div>
		
		<div id="weaponchart" class="col-md-6 test box">
		<h5> Crimes by Weapon Type </h5>
		<WeaponTypeChart filter={this.state.filter}></WeaponTypeChart>
		</div>


		</div>
		
		
		    </div>
		<div id="heatmap" class="col-md-6 test box">
		<div align="right">
		<button>Switch Type</button>
		</div>
		<HeatMap filter={this.state.filter}></HeatMap>
		    </div>
		
		</div>

		
	       </React.Fragment>);
    }

    
}

