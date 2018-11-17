const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');

router.post('/newUser', (req, res) => {
	const user = req.body;
	const { name, email } = user;
	UserModel.findOne({ name }, (error, userExists) => {
		if (error) return console.log('Error, error during finding user');
		if (userExists) return console.log('Error, user already exists');

		const newUser = new UserModel({
			...user
		});
		return newUser.save(error => {
			error ? console.log('Error, while saving') : res.send(newUser);
		});
	});
});

router.get('/users', (req, res) => {
	UserModel.find({}, (err, list) => {
		err ? res.send({ data: 'Error' }) : res.send(list);
	});
});

router.delete('/users/:id', (req, res) => {
	const _id = req.params.id;

	UserModel.findOne({ _id }, (error, user) => {
		if (error) return console.log('Error while searching for user');
		if (!user) return console.log('Error, no user exists with that ID');

		return UserModel.deleteOne({ _id }, error => {
			error ? console.log('Error, couldnt delete user') : res.send({ _id });
		});
	});
});

module.exports = router;
