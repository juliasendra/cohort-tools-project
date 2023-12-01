const router = require("express").Router();
const User = require('../models/User.model')


router.get("/user/:userId", (req, res, next) => {
  
    const { userId } = req.params;
  
    User.findById(userId)
      .then((userDetails) => {
        res.status(200).json(userDetails)
      })
      .catch((error) => {
        next(error)
      })
  })
  
  module.exports = router;