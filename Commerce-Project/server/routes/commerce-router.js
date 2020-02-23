const express = require('express')
const userController = require('../controllers/user-controller')
const router = express.Router()

router.post('/user', userController.createUser)
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)
router.get('/user/:id', userController.getUserById)
router.post('/users', userController.getUser)

module.exports = router