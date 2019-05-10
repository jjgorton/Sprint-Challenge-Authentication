const axios = require('axios');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../database/helpers'); ////////////////////////////////
const jwtKey = require('../auth/secrets');

const { authenticate } = require('../auth/authenticate');

module.exports = (server) => {
	server.post('/api/register', register);
	server.post('/api/login', login);
	server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
	// implement user registration

	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 5);
	user.password = hash;

	Users.add(user)
		.then((user) => {
			const token = generateToken(user);
			res.status(201).json({
				message : `${user.username} Successfully registered!`,
				token
			});
		})
		.catch((err) => {
			res.status(500).json(err.message);
		});
}

function login(req, res) {
	// implement user login

	let { username, password } = req.body;
	Users.findBy({ username })
		.first()
		.then((user) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({
					message : `Welcome ${user.username}!`,
					token
				});
			} else {
				res.status(401).json({ message: `You shall not pass!` });
			}
		})
		.catch((err) => {
			res.status(500).json(err.message);
		});
}

function getJokes(req, res) {
	const requestOptions = {
		headers : { accept: 'application/json' }
	};

	axios
		.get('https://icanhazdadjoke.com/search', requestOptions)
		.then((response) => {
			res.status(200).json(response.data.results);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error Fetching Jokes', error: err });
		});
}

function generateToken(user) {
	const payload = {
		subject  : user.id,
		username : user.username
	};
	const options = {
		expiresIn : '1h'
	};

	return jwt.sign(payload, jwtKey.jwtKey, options);
}
