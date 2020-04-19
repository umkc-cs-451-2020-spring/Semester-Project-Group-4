const UserModel = require('../models/user-model')

createUser = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a user',
    })
  }

  const user = new UserModel(body)
  if (!user) {
    return res.status(400).json({ success: false, error: err })
  }

  user.save((err, data) => {
    if (data) {
      return (
        res.status(200).json({
          success: true,
          id: user._id,
          message: 'User created!',
        })
      )
    }
    else {
      res.status(400).json({
        error: err,
        message: 'Must having unique username and email',
      })
    }
  })
}

updateUser = async (req, res) => {
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
    user.firstName = body.firstName
    user.lastName = body.lastName
    user.phone = body.phone
    user.password = body.password
    user.confirmPassword = body.confirmPassword
    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: 'User updated!',
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'User not updated!',
        })
      })
  })
}

deleteUser = async (req, res) => {
  await UserModel.findOneAndDelete({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: `User not found` })
    }

    return res.status(200).json({ success: true, data: user })
  }).catch(err => err)
}

getUserById = async (req, res) => {
  await UserModel.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: `User not found` })
    }
    return res.status(200).json({ success: true, data: user })
  }).catch(err => err)
}

getUser = async (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a user',
    })
  }

  const user = new UserModel(body)
  if (!user) {
    return res.status(400).json({ success: false, error: err })
  }

  await UserModel.find({ username: body.username, password: body.password }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!user.length) {
      return res
        .status(404)
        .json({ success: false, error: `User not found` })
    }
    return res.status(200).json({ success: true, data: user })
  }).catch(err => err)
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUserById
}