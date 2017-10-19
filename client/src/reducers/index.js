import { combineReducers } from 'redux';
import authReducer from './authReducer';

//global state object
export default combineReducers({
	//the auth piece of state is manufactured by the authReducer
	//"auth" will represent the key in the global state object
	auth: authReducer
});
