//SurveyFormReview shows users their from inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
//give me all of my different action creators
import * as actions from '../../actions';

//on a function based component the passed down props are
//available as a function argument (props.onCancel) (passed down from "SurveyNew.js" as a callback function)
//deconstructing props.formValues as well
//deconstructing the history object as well that is passed to by the withRouter helper function
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	//"onClick={submitSurvey(formValues)}" > call the actionCreator "fromValues" (imported as via * as actions)
	//it is imported in our components via props.submitSurvey
	//important fact:: the above statement would be executed immediately form the js interpreter because it is
	//just a function call; in order to delay it we wrap it up in an arrow function so it will be only
	//executed when the button was actually pressed
	//submitSurvey is the action creator
	return (
		<div>
			<h5>Please confirm your entries</h5>
			{reviewFields}
			<button
				className="yellow darken-3 btn-flat white-text"
				onClick={onCancel}
			>
				Back
			</button>
			<button
				onClick={() => submitSurvey(formValues, history)}
				className="green darken-3 btn-flat right white-text"
			>
				Send Survey
				<i className="material-icons right">email</i>
			</button>
		</div>
	);
};

//pulls out the data from the rudux store and maps it the components props
function mapStateToProps(state) {
	//console.log(state);
	return { formValues: state.form.surveyForm.values };
}

//reduxForm handles the data flow from its field components, meaning, it stores all the values
//from the field in the redux store (we wired up the corresponding reducer)
//we nevertheless have to pull out the data with the usual connect helper function from redux

//wrap the SurveyFormReview component in the withRouter helper function in order to
//have access to the history object with in the component (on the props object) to programmatically
//navigate within the application
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
