const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    username: { type: String, unique: true },
    firstName: String,
    lastName: String,
    phone: String,
    email: { type: String, unique: true },
    password: String,
    confirmPassword: String
  },
  { timestamps: true }
)

UserSchema.plugin(uniqueValidator)
module.exports = mongoose.model('UserSchema', UserSchema)
