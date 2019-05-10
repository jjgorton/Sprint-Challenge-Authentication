import React from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3300/api';

axios.interceptors.request.use(
	function(requestConfig) {
		requestConfig.headers.authorization = localStorage.getItem('jwt');

		return requestConfig;
	},
	function(error) {
		return Promise.reject(error);
	}
);

export default function(Component) {
	return class Authenticated extends React.Component {
		render() {
			const token = localStorage.getItem('jwt');
			const notLoggedIn = <h3>Please login to see our list of jokes</h3>;

			return <div>{token ? <Component {...this.props} /> : notLoggedIn}</div>;
		}
	};
}
