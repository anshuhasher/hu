import React, { Component } from 'react'
import './index.css';
import ReactHighchart from 'react-highcharts'


class Timesheet extends Component {

	constructor(props) {
		super(props)
		this.state = {
			entries: []
		}
	}
	
	/*	-ES6 way of writing a function 
			-This function is passed as a prop to the AddEntryForm component
	*/
	handleAddButtonclick = (e) => {
		e.preventDefault()
		this.setState({
			entries: [
				...this.state.entries, 
				{
					projectCode: $('#project-code').val(),
					activity: $('#activity').val(),
					hours: $('#hours').val()
				}]
		})		
	}
  
  render() {
  	/* -Use className instead of class attributes
			 -React custom components begin with a capital letter like <AddEntryForm>
  	*/
<<<<<<< HEAD
=======
  	const { entries } = this.state
>>>>>>> upstream/goal-2
  	const projectChartData = [{ name: 'Hiway', y: 5}, {name: 'Idera', y: 6}, {name: 'Next-IT',y: 2 }]
  	const activityChartData = [{ name: 'Dev', y: 2}, {name: 'Meeting', y: 5}, {name: 'Debug',y: 2 }]
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
<<<<<<< HEAD
=======
		<form onSubmit={(e) => onAddButtonClick(e)}>
>>>>>>> upstream/goal-2
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
<<<<<<< HEAD
				<input className="form-control" type="number" placeholder="Hours"/>
			</div>
			<div className="col-md-3">
				<input className="btn" type="button" onClick={onAddButtonClick} value="ADD"/>
=======
				<input required id="hours" className="form-control" type="number" placeholder="Hours"/>
			</div>
			<div className="col-md-3">
				<input required className="btn" type="submit" value="ADD"/>
>>>>>>> upstream/goal-2
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
            data: chartData
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
