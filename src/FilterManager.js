import React, {Component} from 'react';
import FilterBox from './FilterBox';
import InOutChart from './InOutChart'
import WeaponTypeChart from './WeaponTypeChart'
import HeatMap from './heatmap';
import Timeline from './Timeline';
import DescriptionChart from './DescriptionChart'
import TimeChart from './TimeChart'
import image from './assets/flag.jpg'
import PointMap from './pointmap'
import Table from './Table'

export default class FilterManager extends Component {

    constructor(props){
	super(props);
	this.state = {filter: "", currentCharts: "all", currentMap: "heatmap"};

	this.updateFilter = this.updateFilter.bind(this);
	this.switchMap = this.switchMap.bind(this);
	this.switchLoc = this.switchLoc.bind(this);
	this.switchAll = this.switchAll.bind(this);
	this.switchDesc = this.switchDesc.bind(this);
	this.switchTime = this.switchTime.bind(this);
	this.switchWeap = this.switchWeap.bind(this);
    }

    updateFilter(newFilter){
	console.log("Found new filter: ", newFilter);
	this.setState({filter: newFilter});
    }

    switchMap(){
	var currentFilter = this.state.filter;
	var currentCharts = this.state.currentCharts;
	var currentMap = "heatmap";
	if(this.state.currentMap == "heatmap"){
	    currentMap = "pointmap";
	}
	this.setState({filter: currentFilter, currentCharts: currentCharts, currentMap: currentMap})
    }

    switchLoc(){
	this.setState({currentCharts: "location"})
    }
    switchDesc(){
	this.setState({currentCharts: "description"})
    }
    switchTime(){
	this.setState({currentCharts: "time"})
    }
    switchWeap(){
	this.setState({currentCharts: "weapon"})
    }

    switchAll(){
	this.setState({currentCharts: "all"})
    }

    render(){


	if(this.state.currentCharts == "all"){


	    var showCharts =
		<div class = "col-md-6">

		<div class = "row">
		<div id="inoutchart" class="col-md-6 test box chart">
		<div style={{"align": "left", "display": "flex", "justify-content": "space-between"}}>
		<h5> Crimes by Location </h5>
		<button  class="max-button" onClick={this.switchLoc}>+</button>
		</div>
		<InOutChart filter={this.state.filter}></InOutChart>
		</div>
		
		<div id="descriptionchart" class="col-md-6 test box chart">
		<div style={{"align": "left", "display": "flex", "justify-content": "space-between"}}>
		<h5> Crimes by Type </h5>
		<button class="max-button" onClick={this.switchDesc}>+</button>
		</div>
		<DescriptionChart filter={this.state.filter}></DescriptionChart>
		</div>
		</div>
		
		<div class = "row">	

		<div id="timechart" class="col-md-6 test box chart">
		<div style={{"align": "left", "display": "flex", "justify-content": "space-between"}}>
		<h5> Crimes by Time of Day </h5>
		<button class="max-button" onClick={this.switchTime}>+</button>
		</div>
		<TimeChart filter={this.state.filter}></TimeChart>
		</div>

		<div id="weaponchart" class="col-md-6 test box chart">
		<div style={{"align": "left", "display": "flex", "justify-content": "space-between"}}>
		<h5> Crimes by Weapon </h5>
		<button class="max-button" onClick={this.switchWeap}>+</button>
		</div>
		<WeaponTypeChart filter={this.state.filter}></WeaponTypeChart>
		</div>
		
		</div>
		</div>
	}else if(this.state.currentCharts == "location"){
	    
	    var showCharts =
		<div id="inoutchart" class="col-md-6 test box chart" style={{"height": "625px"}}>
		<div style={{"align": "left", "display": "flex", "justify-content": "space-between"}}>
		<h5> Crimes by Location </h5>
		<button  class="max-button" onClick={this.switchAll}>-</button>
		</div>
		<InOutChart filter={this.state.filter}></InOutChart>
		</div>

	}else if(this.state.currentCharts == "description"){

	    var showCharts =
		<div id="descriptionchart" class="col-md-6 test box chart" style={{"height": "625px"}}>
		<div style={{"align": "left", "display": "flex", "justify-content": "space-between"}}>
		<h5> Crimes by Type </h5>
		<button class="max-button" onClick={this.switchAll}>-</button>
		</div>
		<DescriptionChart filter={this.state.filter}></DescriptionChart>
		</div>
	}
	else if(this.state.currentCharts == "time"){
	    var showCharts =
		<div id="timechart" class="col-md-6 test box chart" style={{"height": "625px"}}>
		<div style={{"align": "left", "display": "flex", "justify-content": "space-between"}}>
		<h5> Crimes by Time of Day </h5>
		<button class="max-button" onClick={this.switchAll}>-</button>
		</div>
		<TimeChart filter={this.state.filter}></TimeChart>
		</div>
	}
	else if(this.state.currentCharts == "weapon"){

	    var showCharts =
		<div id="weaponchart" class="col-md-6 test box chart" style={{"height": "625px"}}>
		<div style={{"align": "left", "display": "flex", "justify-content": "space-between"}}>
		<h5> Crimes by Weapon </h5>
		<button class="max-button" onClick={this.switchAll}>-</button>
		</div>
		<WeaponTypeChart filter={this.state.filter}></WeaponTypeChart>
		</div>
	}

	
	    //heatmap rendering, changed from button on heatmap
	if(this.state.currentMap == "heatmap"){
		return (<React.Fragment>
			<div class = 'mw-100 test bar' id="header-div">
			<img src= {require('./assets/flag.jpg')} height="100%" width = "300px" style = {{"float": "right"}}></img>
      <img src= {require('./assets/USA_Flag.png')} height="100%" width = "300px" style = {{"float": "right", "padding-right": "8px"}}></img>
			<h1 class="header" style={{"font-size": "48px"}}>Touch Point Baltimore</h1>
			<h1 class="header" style={{"font-size": "28px", "padding-left": "8px"}}>Crime Data Visualizer</h1>
			</div>
		    
			<div id="dataForm" class="col-md-2 test side">
			<FilterBox update={this.updateFilter}></FilterBox>
			</div>
			
			<div id = "timeline" class = "col-md-10 test box chart">
			<Timeline filter={this.state.filter} />
			</div>
			
			<div class = "row test">
			 
			
			{showCharts}
			
			
			<div id="heatmap" class="col-md-6 test box chart">
			<div align="right">
			<button onClick={this.switchMap}>Switch to Pointmap</button>
			</div>
			<HeatMap filter={this.state.filter}></HeatMap>
			</div>
			</div>

			<div class = "row">
			<Table filter = {this.state.filter}></Table>			
			</div>
		    
			</React.Fragment>
		       );
		
	    }
	    //pointmap rendering, changed from button on pointmap
	else{
		return (<React.Fragment>
			<div class = 'mw-100 test bar' id="header-div">
			<img src= {require('./assets/flag.jpg')} height="100%" width = "300px" style = {{"float": "right"}}></img>
      <img src= {require('./assets/USA_Flag.png')} height="100%" width = "300px" style = {{"float": "right", "padding-right": "8px"}}></img>
			<h1 class="header" style={{"font-size": "48px"}}>Touch Point Baltimore</h1>
			<h1 class="header" style={{"font-size": "28px", "padding-left": "8px"}}>Crime Data Visualizer</h1>
			</div>
		    
			<div id="dataForm" class="col-md-2 test side">
			<FilterBox update={this.updateFilter}></FilterBox>
			</div>
			
			<div id = "timeline" class = "col-md-10 test box chart">
			<Timeline filter={this.state.filter} />
			</div>
			
			<div class = "row test">

			{showCharts}
			
			<div id="pointmap" class="col-md-6 test box chart">
			<div align="right">
			<button onClick={this.switchMap}>Switch to Heatmap</button>
			</div>
			<PointMap filter={this.state.filter}></PointMap>
			</div>
			</div>
			
			<div class = "row">
			<div>
			
			<Table filter = {this.state.filter}></Table>
			</div>
			</div>
			
			</React.Fragment>
		       );
	}
	
    }

    
}

