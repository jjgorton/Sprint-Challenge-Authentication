import React from 'react';
import axios from 'axios';

class Login extends React.Component {
	state = {
		username : '',
		password : ''
	};

	handleChanges = (e) => {
		const { id, value } = e.target;

		this.setState({ [id]: value });
	};

	login = (e) => {
		e.preventDefault();
		const endpoint = '/login';

		axios
			.post(endpoint, this.state)
			.then((res) => {
				localStorage.setItem('jwt', res.data.token);
				this.props.history.push('/jokes');
			})
			.catch((err) => {
				console.error('Login Error', err);
			});
	};

	render() {
		return (
			<div className="login-container">
				<h2>Login</h2>
				<form onSubmit={this.login}>
					<div className="input">
						<label htmlFor="username" />
						<input
							id="username"
							onChange={this.handleChanges}
							value={this.state.username}
							type="text"
							placeholder="Username"
						/>
					</div>
					<div className="input">
						<label htmlFor="password" />
						<input
							id="password"
							onChange={this.handleChanges}
							value={this.state.password}
							type="password"
							placeholder="Password"
						/>
					</div>
					<div>
						<button type="submit">Login</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Login;
