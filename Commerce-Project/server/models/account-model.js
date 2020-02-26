const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema(
  {
    accountType: String,
    accountNumber: String,
    processDate: String,
    balance: String,
    actionType: String, // withDrawal (DR) or Deposit (CR)
    amount: String,
    description: String
  },
  { timestamps: true }
)

module.exports = mongoose.model('AccountSchema', AccountSchema)
