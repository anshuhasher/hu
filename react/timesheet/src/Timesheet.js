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
	      <div className="col-md-8 col-md-offset-2">
	      	<Entries sampleProp="This is a sample prop"/>
	      </div>
	      <div className="col-md-8 col-md-offset-2">
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
		const onAddButtonClick = this.props.onAddButtonClick
		let projectCodes = ["Hiway", "Idera", "Next-IT", "Frrole", "MOM", "TrackMe"]
		let activityTypes = ["Dev", "Meeting", "E-mail", "Testing", "Debug", "Learning"]
		return (
		<div className="add-entry-form col-md-offset-3">
			<div className="col-md-3">
				<select className="form-control">
				<option value="" disabled selected>Select Project Code</option>
				{projectCodes.map((code,index) => 
						<option key={index} value={code}>{code}</option>
					)
				}
				</select>		
			</div>
			<div className="col-md-3">
				<select  className="form-control">
				<option value="" disabled selected>Select Activity</option>
				{activityTypes.map((activity,index) => 
						<option key={index} value={activity}>{activity}</option>
					)
				}
				</select>		
			</div>
			<div className="col-md-3">
				<input className="btn" type="button" onClick={onAddButtonClick} value="ADD"/>
			</div>
		</div>
			)
	}
}


class Entries extends Component {
	render() {
		return (
		<div className="timesheet-table">
			<table className="table">
			  <thead>
			    <tr>
			      <th>#</th>
			      <th>Project Code</th>
			      <th>Activity</th>
			      <th>Hours</th>
			    </tr>
			  </thead>
			  <tbody>
			    <tr>
			      <th>1</th>
			      <td>Hiway</td>
			      <td>Dev</td>
			      <td>2</td>
			    </tr>
			    <tr>
			      <th scope="row">2</th>
			      <td>MOM</td>
			      <td>Debug</td>
			      <td>1</td>
			    </tr>
			  </tbody>
			</table>
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
            data: chartData
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
