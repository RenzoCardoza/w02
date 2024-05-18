const router = require('express').Router()
const passport = require('passport')

// this is the routes for the api docs
router.use('/', require('./swagger'))
// this will be the routes for the champions part
router.use('/champions', require('./champions'))
// this will be the routes for the account part
router.use('/account', require('./accounts'))

router.get('/login', passport.authenticate('github'), (req, res) => {})

router.get('/login', function(req, res, next) {
    req.logout(function(err){ 
        if (err) { return next(err) }
        res.redirect('/')
    })
})

module.exports = router