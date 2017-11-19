import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

//In order to determine whether a user is logged in we have to make an
//API request the instance our application boots up
class App extends Component {
	componentDidMount() {
		//call the action creator
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/surveys" component={Dashboard} />
						<Route path="/surveys/new" component={SurveyNew} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}
//1st arg: mapStateToProps
//2nd arg: all the different actions that we want to wire up
//Once we add / wire up all the different actions
//they are assigned as props to the component
//so inside our component we can call the action creater with
//"this.props.fetchUser()"
export default connect(null, actions)(App);
