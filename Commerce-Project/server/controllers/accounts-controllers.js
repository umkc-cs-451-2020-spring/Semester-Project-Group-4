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
      error: 'You must provide a account',
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
      error: 'You must provide a account',
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
      error: 'You must provide a account',
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

createNotifications = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(404).json({
      success: false,
      error: 'You must provide a user',
    })
  }

  UserModel.findOne({ username: req.params.username }, (err, user) => {
    user.notifications.push({
      largeDeposit: body.largeDeposit,
      largeWithDrawal: body.largeWithDrawal,
      overDraft: body.overDraft,
      disableLargeDeposit: false,
      disablelargeWithDrawal: false,
      disableoverDraft: false,
    })

    const alert = user.notifications[0];
    alert.isNew;

    user.save((err, data) => {
      if (data) {
        return (
          res.status(201).json({
            success: true,
            id: user._id,
            message: 'Notifications created!',
          })
        )
      }
      else {
        res.status(400).json({
          error: err,
          message: 'Failed to save notifications'
        })
      }
    })
  })
}

updateNotifications = async (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  UserModel.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'User not found!',
      })
    }
    user.notifications[0].overDraft = body.overDraft
    user.notifications[0].largeWithDrawal = body.largeWithDrawal
    user.notifications[0].largeDeposit = body.largeDeposit
    user.notifications[0].disableLargeDeposit = body.disableLargeDeposit
    user.notifications[0].disablelargeWithDrawal = body.disablelargeWithDrawal
    user.notifications[0].disableoverDraft = body.disableoverDraft
    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: 'Notifications updated!',
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Notifications not updated!',
        })
      })
  })
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
  createNotifications,
  updateNotifications
}