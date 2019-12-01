import React, {Component} from 'react';
import FilterBox from './FilterBox';
import InOutChart from './InOutChart'
import WeaponTypeChart from './WeaponTypeChart'
import HeatMap from './heatmap';
import Timeline from './Timeline';

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

    render(){
	return (<React.Fragment>
		<div class = 'mw-100 test bar'>topSize</div>

		<div id="dataForm" class="col-md-2 test side">
		<FilterBox update={this.updateFilter}></FilterBox>
		</div>

		<div id = "timeline" class = "col-md-10 test box">
		<Timeline></Timeline>
		</div>

		<div class = "row test">
		<div id="inoutchart" class="col-md-3 test box">
		<InOutChart></InOutChart>
		</div>
		
		<div id="weaponchart" class="col-md-3 test box">.col-md-3
		<WeaponTypeChart filter={this.state.filter}></WeaponTypeChart>
		</div>
		
		<div id="heatmap" class="col-md-3 test box">
		<HeatMap></HeatMap>
		</div>
		
		<div id="data2" class="col-md-3 test box">.col-md-3</div>
		</div>
		<div class = "row test">
		<div id="data" class="col-md-3 test box">.col-md-3</div>
		
		<div id="data" class="col-md-3 test box">.col-md-3</div>
		
		<div id="data" class="col-md-3 test box">.col-md-3</div>
		
		<div id="data" class="col-md-3 test box">.col-md-3</div>
		</div>
	       </React.Fragment>);
    }
    
}
