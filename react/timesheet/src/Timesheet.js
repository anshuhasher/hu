import React, { Component } from 'react'
import './index.css';


class Timesheet extends Component {
	
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
	      <div className="col-md-12">
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
		return (
		<div className="add-entry-form col-md-offset-3">
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
		<div>
		{this.props.sampleProp}
		</div>
			)
	}
}

class Reports extends Component {
	render() {
		return (
		<div>
		Reports Component
		</div>
			)
	}
}

export default Timesheet;
