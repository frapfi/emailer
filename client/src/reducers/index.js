import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

//global state object
export default combineReducers({
	//the auth piece of state is manufactured by the authReducer
	//"auth" will represent the key in the global state object
	auth: authReducer,
	form: reduxForm,
	//surveys piece of state will be produced by the surveysReducer
	surveys: surveysReducer
});
