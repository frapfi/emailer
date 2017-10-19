import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
	//console.log(action);
	switch (action.type) {
		//make sure that the reducer either returns
		//null: when request is still pending
		//the user model when user is logged in
		//false: (instead of and empty string) when not logged in
		case FETCH_USER:
			//when "action.payload" is an empty string an´ thus a falsy value
			//the second operand is evaluated and returned
			return action.payload || false;
		default:
			return state;
	}
}

//result of the reducer: the redux store
//(and thus all the components when correctly hooked up to the redux store)
//is now aware about the current state of the log in process
