const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        phone: { type: String },
        email: { type: String },
    },
    { timestamps: true }
)

module.exports = mongoose.model('UserSchema', UserSchema)
