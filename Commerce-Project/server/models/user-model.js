const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
	{
		username: String,
		firstName: String,
		lastName: String,
		phone: String,
		email: String,
		password: String,
		confirmPassword: String
	},
	{ timestamps: true }
)

module.exports = mongoose.model('UserSchema', UserSchema)
