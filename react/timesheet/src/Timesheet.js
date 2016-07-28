import React, { Component } from 'react'
import './index.css';
import ReactHighchart from 'react-highcharts'


class Timesheet extends Component {

	constructor(props) {
		super(props)
		this.state = {
			entries: [],
			projectChartData: [],
			activityChartData: []
		}
	}
	
	/*	-ES6 way of writing a function 
			-This function is passed as a prop to the AddEntryForm component
	*/
	handleAddButtonclick = (e) => {
		e.preventDefault()
		let projectCode = $('#project-code').val()
		let activity = $('#activity').val()
		let hours = parseInt($('#hours').val())
		this.setState({
			entries: [
				...this.state.entries, 
				{
					projectCode: projectCode,
					activity: activity,
					hours: hours
				}],
				projectChartData: [
				...this.state.projectChartData,
				{
					name: projectCode,
					y: hours
				}],
				activityChartData: [
				...this.state.activityChartData,
				{
					name: activity,
					y: hours
				}]
		})
	}
  
  render() {
  	/* -Use className instead of class attributes
			 -React custom components begin with a capital letter like <AddEntryForm>
  	*/
  	const { entries, projectChartData, activityChartData } = this.state
  	return (
    	<div className="row">
	      <div className="col-md-12">
	      	<AddEntryForm onAddButtonClick={this.handleAddButtonclick} />
	      </div>
	      <div className="col-md-8 col-md-offset-2">
	      	<Entries entries={entries}/>
	      </div>
	      <div className="col-md-10 col-md-offset-1">
	      	<Reports chartData={activityChartData} title="By Activity"/>
	      	<Reports chartData={projectChartData} title="By Project"/>
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
		let projectCodes = ["Hiway", "Idera", "Next-IT", "Frrole", "MOM", "TrackMe"]
		let activityTypes = ["Dev", "Meeting", "E-mail", "Testing", "Debug", "Learning"]
		return (
		<div className="add-entry-form col-md-offset-2">
		<form onSubmit={(e) => onAddButtonClick(e)}>
			<div className="col-md-3">
				<select required id="project-code" className="form-control">
				<option value="" disabled selected>Select Project Code</option>
				{projectCodes.map((code,index) => 
						<option key={index} value={code}>{code}</option>
					)
				}
				</select>		
			</div>
			<div className="col-md-3">
				<select required id="activity" className="form-control">
					<option value="" disabled selected>Select Activity</option>
					{activityTypes.map((activity,index) => 
							<option key={index} value={activity}>{activity}</option>
						)
					}
				</select>		
			</div>
			<div className="col-md-3">
				<input required id="hours" className="form-control" type="number" placeholder="Hours"/>
			</div>
			<div className="col-md-3">
				<input required className="btn" type="submit" value="ADD"/>
			</div>
		</form>
		</div>
			)
	}
}


class Entries extends Component {
	render() {

		const { entries } = this.props

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
			  	{entries.map((entry, index) => 
			  		<tr key={index}>
				      <th>{index+1}</th>
				      <td>{entry.projectCode}</td>
				      <td>{entry.activity}</td>
				      <td>{entry.hours}</td>
				    </tr>
			  	)}
			  </tbody>
			</table>
		</div>
			)
	}
}

class Reports extends Component {
	render() {
		const { chartData, title} = this.props
		
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
            text: title
        },
        series: [{
            name: title,
            colorByPoint: true,
            data: processedChartData
        }]
    }

		return (
		<div className="reports col-md-4 col-md-offset-1">
			<ReactHighchart config={chartConfig}/>
		</div>
			)
	}
}

export default Timesheet;
