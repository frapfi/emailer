//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

import formFields from './formFields';

//"reduxForm" helper is waht allows ReduxForm to communicate with our redux store
//"handleSubmit" is provided by "reduxForm" helper. the helper is adding
// some additional props to the surveyForm, the function we pass to it as callback
// will be automatically called when the form is submitted
class SurveyForm extends Component {
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field
					key={name}
					component={SurveyField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});

		//Validation / Error Handling and its display on the Frontend:
		//When an error object property (errors.title = 'You must provide a title!';)
		//matches a field name (name="title") Redux Form will automatically connect the dots
		//and pass the error message to just the instance of the field / input that is controlling
		//that name
		/*
		return (
			<div>
				<Field
					label="Survey Title"
					type="text"
					name="title"
					component={SurveyField}
				/>
				<Field
					label="Subject Line"
					type="text"
					name="subject"
					component={SurveyField}
				/>
				<Field
					label="Email Body"
					type="text"
					name="body"
					component={SurveyField}
				/>
				<Field
					label="Recipient List"
					type="text"
					name="emails"
					component={SurveyField}
				/>
			</div>
		);
		*/
	}

	render() {
		//"name" property: the input value will be stored under this key in redux store
		//"handleSubmit" is provided by Redux Form. Wen we pass our own function to it, it will
		//be called whenever the form is submitted. With it comes the field values object
		//"onSurveySubmit" passed down from "SurveyNew" component
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(
						//values => console.log(values)
						this.props.onSurveySubmit
					)}
				>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button
						type="submit"
						className="teal btn-flat right white-text"
					>
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	//create an empty error object
	const errors = {};

	errors.recipients = validateEmails(values.recipients || '');

	_.each(formFields, ({ name }) => {
		//read out "title", "subject", etc. properties
		if (!values[name]) {
			errors[name] = 'You must provide a value';
		}
	});

	//validation logic
	/*
	if (!values.title) {
		//if validation fails add a property to the error object
		//so redux from knows that the from is invalid
		errors.title = 'You must provide a title!';
	}
	if (!values.subject) {
		//if validation fails add a property to the error object
		//so redux from knows that the from is invalid
		errors.subject = 'You must provide a subject!';
	}
	if (!values.body) {
		//if validation fails add a property to the error object
		//so redux from knows that the from is invalid
		errors.body = 'You must provide a body!';
	}
	*/

	return errors;
}

//reduxForm can be thought as nearly identical to the connectHelper-function
//reduxForm allows our component to communicate with the redux store at the top of our
//application that is enclosed with the Provider tag
export default reduxForm({
	validate,
	//creates a namespace for this specific form which can be accessed in the
	//redux store via "from.surveyForm.values"
	//sidenote: when creating othe form with this name, the same values would be shared across
	//all forms. This is an use case for a "page by page" or wizard form
	form: 'surveyForm',
	//prevents ReduxForm from dumbing/clearing all the values when the form was unmounted
	destroyOnUnmount: false
})(SurveyForm);
