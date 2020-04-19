const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema

const NotificationSchema = new Schema(
  {
    largeDeposit: Number || String,
    largeWithDrawal: Number || String,
    overDraft: Number || String,
    disableLargeDeposit: Boolean,
    disablelargeWithDrawal: Boolean,
    disableoverDraft: Boolean,
  },
  { timestamps: true }
)

const AccountSchema = new Schema(
  {
    accountType: String,
    accountNumber: Number,
    processDate: String,
    balance: Number,
    actionType: String, // Withdrawal (DR) or Deposit (CR)
    amount: Number || String,
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
    savings: [AccountSchema],
    notifications: [NotificationSchema]
  },
  { timestamps: true }
)

UserSchema.plugin(uniqueValidator)
module.exports = mongoose.model('UserSchema', UserSchema)
