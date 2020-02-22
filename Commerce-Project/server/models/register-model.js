const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RegisterSchema = new Schema(
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

module.exports = mongoose.model('RegisterSchema', RegisterSchema)
