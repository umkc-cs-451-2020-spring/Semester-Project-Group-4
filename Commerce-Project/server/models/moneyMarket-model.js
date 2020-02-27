const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MoneyMarketSchema = new Schema(
  {
    accountType: String,
    accountNumber: String,
    processDate: String,
    balance: Number,
    actionType: String, // withDrawal (DR) or Deposit (CR)
    amount: Number,
    description: String
  },
  { timestamps: true }
)

module.exports = mongoose.model('MoneyMarketSchema', MoneyMarketSchema)
