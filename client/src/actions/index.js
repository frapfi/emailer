import axios from 'axios';
import { FETCH_USER } from './types';

//without reduxThunk (let's access the dispatch function directly)
//reduxThunk inspects the action and when it sees that we return a
//function instead of an action it automatically call this function and
//pass in that dispatch function as an argument
//in this case we have direct access to the dispatch function and thus can
//determine on our own when to dispatch the action to the reducers

//purpose in our scenario: we want the action to get dispatched only / just
//after the ajax/axios request has finished
//we want not to dispatch an action until the API request has been completed
/*

	const request = axios.get('/api/current_user');

	return {
		type: FETCH_USER,
		payload: request
	}
*/

/*
//returning a function
//when the request is complete the action can be dispatched
export const fetchUser = () => {
	return function(dispatch) {
		//when we get back the response dispatch the action with the response as payload
		axios
			.get('/api/current_user')
			.then(res => dispatch({ type: FETCH_USER, payload: res }));
	};
};
*/
//refactored to:
export const fetchUser = () => async dispatch => {
	//when we get back the response dispatch the action with the response as payload
	const res = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: res.data });
};
