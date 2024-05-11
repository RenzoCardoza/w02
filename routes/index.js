const router = require('express').Router()

router.use('/', require('./swagger'))

router.use('/champions', require('./champions'))

module.exports = router