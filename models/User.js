const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	}
});

const UserModel = mongoose.model('User', User);

module.exports = UserModel;
