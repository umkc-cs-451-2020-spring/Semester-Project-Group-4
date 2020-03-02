const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

const AccountSchema = new Schema(
  {
    accountType: String,
    accountNumber: Number,
    processDate: String,
    balance: Number,
    actionType: String, // withDrawal (DR) or Deposit (CR)
    amount: Number,
    description: String
  },
  { timestamps: true }
)

const UserSchema = new Schema(
  {
    username: { type: String, unique: true },
    firstName: String,
    lastName: String,
    phone: String,
    email: { type: String, unique: true },
    password: String,
    confirmPassword: String,
    checking: [AccountSchema],
    moneyMarket: [AccountSchema],
    savings: [AccountSchema]
  },
  { timestamps: true }
)

UserSchema.plugin(uniqueValidator)
module.exports = mongoose.model('UserSchema', UserSchema)
