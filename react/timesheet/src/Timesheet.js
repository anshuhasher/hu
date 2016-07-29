import React, { Component } from 'react'
import './index.css';
import ReactHighchart from 'react-highcharts'


export default class TimesheetContainer extends Component {

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
		let projectCode = document.getElementById('project-code').value
		let activity = document.getElementById('activity').value
		let hours = parseInt(document.getElementById('hours').value, 10)
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
  	const { entries, projectChartData, activityChartData } = this.state
  	return (
    	<Timesheet onAddButtonClick={this.handleAddButtonclick} entries={entries}
    						 projectChartData={projectChartData} activityChartData={activityChartData} />
    )
  }
}

class Timesheet extends Component {
  render() {
  	/* -Use className instead of class attributes
			 -React custom components begin with a capital letter like <AddEntryForm>
  	*/
  	const { onAddButtonClick, entries, projectChartData, activityChartData } = this.props
    return (
      <div className="row">
	      <div className="col-md-12">
	      	<AddEntryForm onAddButtonClick={onAddButtonClick} />
	      </div>
	      <div className="col-md-8 col-md-offset-2">
	      	<Entries entries={entries}/>
	      </div>
	      <div className="col-md-10 col-md-offset-1">
	      	<Reports chartData={activityChartData} title="By Activity"/>
	      	<Reports chartData={projectChartData} title="By Project"/>
	      </div>
      </div>
    );
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
				<select required id="project-code" className="form-control" defaultValue="" >
				<option value="" disabled >Select Project Code</option>
				{projectCodes.map((code,index) =>
						<option key={index} value={code}>{code}</option>
					)
				}
				</select>
			</div>
			<div className="col-md-3">
				<select required id="activity" className="form-control" defaultValue="">
					<option value="" disabled>Select Activity</option>
					{activityTypes.map((activity,index) =>
							<option key={index} value={activity}>{activity}</option>
						)
					}
				</select>
			</div>
			<div className="col-md-3">
				<input required id="hours" className="time-field" type="number" placeholder="Hours"/>
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
			  <thead className="table-headings">
			    <tr>
			      <th className="index-heading">#</th>
			      <th className="table-headings">Project Code</th>
			      <th className="table-headings">Activity</th>
			      <th className="table-headings">Hours</th>
			    </tr>
			  </thead>
			  <tbody>
			  	{entries.map((entry, index) =>
			  		<tr key={index}>
				      <th className="index-cell">{index+1}</th>
				      <td className="data-cell">{entry.projectCode}</td>
				      <td className="data-cell">{entry.activity}</td>
				      <td className="data-cell">{entry.hours}</td>
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

    /* This is a helper function to manipulate chartData. Let it be here as it is */

    chartData.map((data, index) => {
      if(!temp[data.name]) {
    		temp[data.name] = data
      }
      else {
    		temp[data.name].y += data.y
      }
      return null
    })

    let processedChartData = [];
    for (let prop in temp) {
    	if(!temp.hasOwnProperty(prop)) {
    		continue;
    	}
      processedChartData.push(temp[prop])
    }

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
