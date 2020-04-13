const UserModel = require('../models/user-model')

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

getNotifications = async (req, res) => {
  UserModel.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: `Notifications not found` })
    }
    return res.status(200).json({ success: true, data: user.notifications })
  }).catch(err => err)
}

module.exports = {
  createNotifications,
  updateNotifications,
  getNotifications
}