const UserModel = require('../models/user-model');

createCheckingTransaction = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(404).json({
      success: false,
      error: 'You must provide a user',
    })
  }

  UserModel.findOne({ username: req.params.username }, (err, user) => {
    user.checking.push({
      accountType: body.accountType,
      accountNumber: body.accountNumber,
      processDate: body.processDate,
      balance: body.balance,
      actionType: body.accountType, // withDrawal (DR) or Deposit (CR)
      amount: body.amount,
      description: body.description
    })

    const transaction = user.checking[0];
    transaction.isNew;

    user.save((err, data) => {
      if (data) {
        return (
          res.status(201).json({
            success: true,
            id: user._id,
            message: 'User created!',
          })
        )
      }
      else {
        res.status(400).json({
          error: err,
          message: 'Failed to save transaction'
        })
      }
    })
  })
}




module.exports = {
  createCheckingTransaction
}