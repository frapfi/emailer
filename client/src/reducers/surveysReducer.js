import { FETCH_SURVEYS } from '../actions/types';

export default function(state = [], action) {
	//console.log(action);
	switch (action.type) {
		case FETCH_SURVEYS:
			return action.payload;
		default:
			return state;
	}
}

//result of the reducer: the redux store
//(and thus all the components when correctly hooked up to the redux store)
//is now aware about the current state of the log in process
