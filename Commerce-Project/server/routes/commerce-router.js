const express = require('express')
const commerceController = require('../controllers/commerce-controller')
const router = express.Router()

router.post('/user', commerceController.createUser)
router.put('/user/:id', commerceController.updateUser)
router.delete('/user/:id', commerceController.deleteUser)
router.get('/user/:id', commerceController.getUserById)
router.get('/users', commerceController.getUser)

module.exports = router