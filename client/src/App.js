import React from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';

import './App.css';

import Login from './components/auth/Login';
import Jokes from './components/jokes/Jokes';
import Signup from './components/auth/Signup';

function App(props) {
	const logout = () => {
		localStorage.removeItem('jwt');
		props.history.push('/login');
	};

	return (
		<div className="App">
			<nav className="navbar">
				<NavLink className="link" to="/register">
					Sign-up
				</NavLink>
				<NavLink className="link" to="/login">
					Login
				</NavLink>
				<button className="link" onClick={logout}>
					Logout
				</button>
				<NavLink className="link" to="/jokes">
					Dad Jokes
				</NavLink>
			</nav>
			<main>
				<Route path="/register" component={Signup} />
				<Route path="/login" component={Login} />
				<Route path="/jokes" component={Jokes} />
			</main>
		</div>
	);
}

export default withRouter(App);
