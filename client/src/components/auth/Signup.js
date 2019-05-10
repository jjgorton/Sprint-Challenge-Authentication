import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
	state = {
		username : '',
		password : ''
	};

	handleChanges = (e) => {
		const { id, value } = e.target;

		this.setState({ [id]: value });
	};

	signin = (e) => {
		e.preventDefault();
		const endpoint = '/register';

		axios
			.post(endpoint, this.state)
			.then((res) => {
				localStorage.setItem('jwt', res.data.token);
				this.props.history.push('/jokes');
			})
			.catch((err) => {
				console.error('Sign-up Error', err);
			});
	};

	render() {
		return (
			<div className="sign-in-container">
				<h2>Sign-up</h2>
				<form onSubmit={this.signin}>
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
						<button type="submit">Sign-up</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Signup;
