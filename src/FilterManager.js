import React, {Component} from 'react';

export default class FilterManager extends Component {

    render(){
	return (<React.Fragment>
		<div class = 'mw-100 test bar'>topSize</div>
      <div id="dataForm" class="col-md-2 test side">side</div>

      <div id = "timeline" class = "col-md-10 test box">timeline</div>

      <div class = "row test">
        <div id="inoutchart" class="col-md-3 test box">.col-md-3</div>
    
        <div id="weaponchart" class="col-md-3 test box">.col-md-3</div>
        
        <div id="heatmap" class="col-md-3 test box">.col-md-3</div>

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
