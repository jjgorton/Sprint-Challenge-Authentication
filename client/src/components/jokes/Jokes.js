import React from 'react';
import axios from 'axios';

import requiresAuth from '../auth/requiresAuth';

class Jokes extends React.Component {
	state = {
		jokes : []
	};

	render() {
		return (
			<div className="jokes-list">
				<h2>Dad Jokes</h2>
				<ul>{this.state.jokes.map((joke) => <li key={joke.id}>{joke.joke}</li>)}</ul>
			</div>
		);
	}

	componentDidMount() {
		const endpoint = '/jokes';

		axios
			.get(endpoint)
			.then((res) => {
				this.setState({ jokes: res.data });
			})
			.catch((err) => console.error(err));
	}
}

export default requiresAuth(Jokes);
