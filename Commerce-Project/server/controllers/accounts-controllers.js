const UserModel = require('../models/user-model');

createCheckingTransaction = async (req, res) => {
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
      actionType: body.actionType, // withDrawal (DR) or Deposit (CR)
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
            message: 'Transaction created!',
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

getCheckingAccount = async (req, res) => {
  UserModel.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: `User not found` })
    }
    return res.status(200).json({ success: true, data: user.checking })
  }).catch(err => err)
}

getCheckingBalance = async (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an account',
    })
  }

  UserModel.findOne({ username: req.params.username }, (err, user) => {
    UserModel.aggregate([
      {
        $project:
        {
          _id: null,
          amount: { $sum: "$checking.amount" }
        }
      }
    ]).then(sum => res.status(200).json({ success: false, data: sum }));
  })
}

getLastCheckingTransaction = async (req, res) => {
  UserModel.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: `User not found` })
    }

    const lastValue = user.checking.slice(-1)[0];

    return res.status(200).json({ success: true, data: lastValue })
  }).catch(err => err)
}

createSavingsTransaction = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(404).json({
      success: false,
      error: 'You must provide a user',
    })
  }

  UserModel.findOne({ username: req.params.username }, (err, user) => {
    user.savings.push({
      accountType: body.accountType,
      accountNumber: body.accountNumber,
      processDate: body.processDate,
      balance: body.balance,
      actionType: body.actionType, // withDrawal (DR) or Deposit (CR)
      amount: body.amount,
      description: body.description
    })

    const transaction = user.savings[0];
    transaction.isNew;

    user.save((err, data) => {
      if (data) {
        return (
          res.status(201).json({
            success: true,
            id: user._id,
            message: 'Transaction created!',
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

getSavingsAccount = async (req, res) => {
  UserModel.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: `User not found` })
    }
    return res.status(200).json({ success: true, data: user.savings })
  }).catch(err => err)
}

getSavingsBalance = async (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an account',
    })
  }

  UserModel.findOne({ username: req.params.username }, (err, user) => {
    UserModel.aggregate([
      {
        $project:
        {
          _id: null,
          amount: { $sum: "$savings.amount" }
        }
      }
    ]).then(sum => res.status(200).json({ success: false, data: sum }));
  })
}

getLastSavingsTransaction = async (req, res) => {
  UserModel.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: `User not found` })
    }

    const lastValue = user.savings.slice(-1)[0];

    return res.status(200).json({ success: true, data: lastValue })
  }).catch(err => err)
}

createMoneyMarketTransaction = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(404).json({
      success: false,
      error: 'You must provide a user',
    })
  }

  UserModel.findOne({ username: req.params.username }, (err, user) => {
    user.moneyMarket.push({
      accountType: body.accountType,
      accountNumber: body.accountNumber,
      processDate: body.processDate,
      balance: body.balance,
      actionType: body.actionType, // withDrawal (DR) or Deposit (CR)
      amount: body.amount,
      description: body.description
    })

    const transaction = user.moneyMarket[0];
    transaction.isNew;

    user.save((err, data) => {
      if (data) {
        return (
          res.status(201).json({
            success: true,
            id: user._id,
            message: 'Transaction created!',
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

getMoneyMarketAccount = async (req, res) => {
  UserModel.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: `User not found` })
    }
    return res.status(200).json({ success: true, data: user.moneyMarket })
  }).catch(err => err)
}

getMoneyMarketBalance = async (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an account',
    })
  }

  UserModel.findOne({ username: req.params.username }, (err, user) => {
    UserModel.aggregate([
      {
        $project:
        {
          _id: null,
          amount: { $sum: "$moneyMarket.amount" }
        }
      }
    ]).then(sum => res.status(200).json({ success: false, data: sum }));
  })
}

getLastMoneyMarketTransaction = async (req, res) => {
  UserModel.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: `User not found` })
    }

    const lastValue = user.moneyMarket.slice(-1)[0];

    return res.status(200).json({ success: true, data: lastValue })
  }).catch(err => err)
}

module.exports = {
  createCheckingTransaction,
  getCheckingAccount,
  getCheckingBalance,
  createSavingsTransaction,
  getSavingsAccount,
  getSavingsBalance,
  createMoneyMarketTransaction,
  getMoneyMarketAccount,
  getMoneyMarketBalance,
  getLastMoneyMarketTransaction,
  getLastSavingsTransaction,
  getLastCheckingTransaction
}