const router = require('express').Router()

// this is the routes for the api docs
router.use('/', require('./swagger'))
// this will be the routes for the champions part
router.use('/champions', require('./champions'))

module.exports = router