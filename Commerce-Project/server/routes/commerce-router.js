const express = require('express')
const userController = require('../controllers/user-controller')
const accountController = require('../controllers/account-controller')
const router = express.Router()

// users
router.post('/user', userController.createUser)
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)
router.get('/user/:id', userController.getUserById)
router.post('/users', userController.getUser)

// accounts
router.post('/checking', accountController.createCheckingTransaction)
router.get('/checkings', accountController.getChecking)
router.post('/saving', accountController.createSavingsTransaction)
router.get('/savings', accountController.getSavings)
router.post('/moneymarket', accountController.createMoneyMarketTransaction)
router.get('/moneymarkets', accountController.getMoneyMarket)

module.exports = router