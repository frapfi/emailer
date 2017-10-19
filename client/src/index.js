import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
//when an index.js in a folder, it will be automatically imported
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//the provider react component knows how to re-render from our Redux store any time the
//store gets some new state produced inside of it the provider will inform
//all of it's children component that some new state is available and
//update all the component
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
