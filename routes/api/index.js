const express = require('express')
const challenge_router = require('./challenge')

const router = express.Router()

router.use('/challenge', challenge_router)

module.exports = router
