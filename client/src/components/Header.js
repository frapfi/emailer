import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google">Login With Google</a>
					</li>
				);
			default:
				return (
					<li>
						<a href="/api/logout">Logout</a>
					</li>
				);
		}
	}

	render() {
		//console.log(this.props);
		return (
			<nav>
				<div className="nav-wrapper">
					<Link
						to={this.props.auth ? '/surveys' : '/'}
						className="left brand-logo"
					>
						Emaily
					</Link>
					<ul>
						<li className="right">{this.renderContent()}</li>
					</ul>
				</div>
			</nav>
		);
	}
}

// function mapStateToProps(state) {
// 	//key from global state object in "reducer/index.js"
// 	return { auth: state.auth };
// }
//es6 refactoring
function mapStateToProps({ auth }) {
	//key from global state object in "reducer/index.js"
	return { auth };
}

export default connect(mapStateToProps)(Header);
