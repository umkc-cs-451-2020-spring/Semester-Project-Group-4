const CheckingModel = require('../models/checking-model');
const SavingsModel = require('../models/savings-model');
const MoneyMarketModel = require('../models/moneyMarket-model');

// checking account
createCheckingTransaction = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an account',
    })
  }

  const account = new CheckingModel(body)
  if (!account) {
    return res.status(400).json({ success: false, error: err })
  }

  account.save((err, data) => {
    if (data) {
      return (
        res.status(200).json({
          success: true,
          id: account._id,
          message: 'Added Transactions!',
        })
      )
    }
    else {
      res.status(400).json({
        error: err,
        message: 'Add transaction failed',
      })
    }
  })
}

getChecking = async (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a account',
    })
  }

  const account = new CheckingModel(body)
  if (!account) {
    return res.status(400).json({ success: false, error: err })
  }

  await CheckingModel.find({}, (err, account) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!account.length) {
      return res
        .status(404)
        .json({ success: false, error: `Account not found` })
    }
    return res.status(200).json({ success: true, data: account })
  }).catch(err => err)
}

// savings account
createSavingsTransaction = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an account',
    })
  }

  const account = new SavingsModel(body)
  if (!account) {
    return res.status(400).json({ success: false, error: err })
  }

  account.save((err, data) => {
    if (data) {
      return (
        res.status(200).json({
          success: true,
          id: account._id,
          message: 'Added Transactions!',
        })
      )
    }
    else {
      res.status(400).json({
        error: err,
        message: 'Add transaction failed',
      })
    }
  })
}

getSavings = async (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a account',
    })
  }

  const account = new SavingsModel(body)
  if (!account) {
    return res.status(400).json({ success: false, error: err })
  }

  await SavingsModel.find({}, (err, account) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!account.length) {
      return res
        .status(404)
        .json({ success: false, error: `Account not found` })
    }
    return res.status(200).json({ success: true, data: account })
  }).catch(err => err)
}

// money market account
createMoneyMarketTransaction = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an account',
    })
  }

  const account = new MoneyMarketModel(body)
  if (!account) {
    return res.status(400).json({ success: false, error: err })
  }

  account.save((err, data) => {
    if (data) {
      return (
        res.status(200).json({
          success: true,
          id: account._id,
          message: 'Added Transactions!',
        })
      )
    }
    else {
      res.status(400).json({
        error: err,
        message: 'Add transaction failed',
      })
    }
  })
}

getMoneyMarket = async (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a account',
    })
  }

  const account = new MoneyMarketModel(body)
  if (!account) {
    return res.status(400).json({ success: false, error: err })
  }

  await MoneyMarketModel.find({}, (err, account) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!account.length) {
      return res
        .status(404)
        .json({ success: false, error: `Account not found` })
    }
    return res.status(200).json({ success: true, data: account })
  }).catch(err => err)
}

module.exports = {
  createCheckingTransaction,
  getChecking,
  createSavingsTransaction,
  getSavings,
  createMoneyMarketTransaction,
  getMoneyMarket
}
