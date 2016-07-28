import React, { Component } from 'react'
import './index.css';
import ReactHighchart from 'react-highcharts'


class Timesheet extends Component {

	constructor(props) {
		super(props)
		this.state = {
			/*Initialize your state here*/
		}
	}
	
	/*	-ES6 way of writing a function 
			-This function is passed as a prop to the AddEntryForm component
	*/
	handleAddButtonclick = () => {console.log("This is called from Timesheet Component")}
  
  render() {
  	/* -Use className instead of class attributes
			 -React custom components begin with a capital letter like <AddEntryForm>
  	*/
    return (
    	<div className="row">
	      <div className="col-md-12">
	      	<AddEntryForm onAddButtonClick={this.handleAddButtonclick} />
	      </div>
	      <div className="col-md-12">
	      	<Entries sampleProp="This is a sample prop"/>
	      </div>
	      <div className="col-md-4 col-md-offset-2">
	      	<Reports />
	      </div>
      </div>
    )
  }
}

class AddEntryForm extends Component {
	
	//to validate the datatypes of props
	static propTypes = {
    onAddButtonClick: React.PropTypes.func,
  }

	render() {
		const { onAddButtonClick } = this.props
		return (
		<div className="add-entry-form col-md-offset-3">
			<h2>Timesheet Form Component</h2>
			<div className="col-md-2">
				<input className="btn" type="button" onClick={onAddButtonClick} value="ADD"/>
			</div>
		</div>
			)
	}
}


class Entries extends Component {
	render() {
		return (
		<div className="timesheet-table col-md-offset-3">
			<h2>Timesheet Entries Component</h2>
			{this.props.sampleProp}
		</div>
			)
	}
}

class Reports extends Component {
	render() {
		const  chartData = [{
                name: 'Hiway',
                y: 5
            }, {
                name: 'Idera',
                y: 6
            }, {
                name: 'Next-IT',
                y: 2
            }]
    let temp = {};
        chartData.map((data, index) => {
            if(!temp[data.name]) {
      temp[data.name] = data;
           }
          else {
      temp[data.name].y += data.y;
           }
        })
        
        let processedChartData = [];
        for (let prop in temp)
            processedChartData.push(temp[prop]);
		const chartConfig = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            width: 350,
        },
        title: {
            text: 'Activity Tracker'
        },
        series: [{
            name: 'Activity Tracker',
            colorByPoint: true,
            data: processedChartData
        }]
    }

		return (
		<div className="reports">
			<ReactHighchart config={chartConfig}/>
		</div>
			)
	}
}

export default Timesheet;
