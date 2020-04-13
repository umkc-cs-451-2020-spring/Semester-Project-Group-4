const express = require('express')
const userController = require('../controllers/user-controller')
const accountController = require('../controllers/accounts-controllers')
const router = express.Router()

// users
router.post('/user', userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.get('/user/:username', userController.getUserById);
router.post('/users', userController.getUser);

// accounts
router.post('/addchecking/:username', accountController.createCheckingTransaction)
router.get('/getchecking/:username', accountController.getCheckingAccount)
router.get('/checkingbalance/:username', accountController.getCheckingBalance)

router.post('/addsavings/:username', accountController.createSavingsTransaction)
router.get('/getsavings/:username', accountController.getSavingsAccount)
router.get('/savingsbalance/:username', accountController.getSavingsBalance)

router.post('/addmoneymarket/:username', accountController.createMoneyMarketTransaction)
router.get('/getmoneymarket/:username', accountController.getMoneyMarketAccount)
router.get('/moneymarketbalance/:username', accountController.getMoneyMarketBalance)

// notifications 
router.post('/addnotifications/:username', accountController.createNotifications)
router.put('/updatenotifications/:username', accountController.updateNotifications)

module.exports = router