const express = require('express')
const userController = require('../controllers/user-controller')
const accountController = require('../controllers/accounts-controllers')
const notifcationsController = require('../controllers/notifications-controller')
const router = express.Router()

// users
router.post('/user', userController.createUser);
router.put('/userUpdate/:username', userController.updateUser);
router.delete('/user/:username', userController.deleteUser);
router.get('/user/:username', userController.getUserById);
router.post('/users', userController.getUser);

// accounts
router.post('/addchecking/:username', accountController.createCheckingTransaction)
router.get('/getchecking/:username', accountController.getCheckingAccount)
router.get('/checkingbalance/:username', accountController.getCheckingBalance)
router.get('/getlastchecking/:username', accountController.getLastCheckingTransaction)

router.post('/addsavings/:username', accountController.createSavingsTransaction)
router.get('/getsavings/:username', accountController.getSavingsAccount)
router.get('/savingsbalance/:username', accountController.getSavingsBalance)
router.get('/getlastsavings/:username', accountController.getLastSavingsTransaction)

router.post('/addmoneymarket/:username', accountController.createMoneyMarketTransaction)
router.get('/getmoneymarket/:username', accountController.getMoneyMarketAccount)
router.get('/moneymarketbalance/:username', accountController.getMoneyMarketBalance)
router.get('/getlastmoneymarket/:username', accountController.getLastMoneyMarketTransaction)

// notifications 
router.post('/addnotifications/:username', notifcationsController.createNotifications)
router.put('/updatenotifications/:username', notifcationsController.updateNotifications)
router.get('/getnotifications/:username', notifcationsController.getNotifications)

module.exports = router