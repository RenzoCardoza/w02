const express = require('express')
const router = express.Router()
const accountController = require('../controllers/accounts')
const validator = require('../utilities/validate')

// ROUTES //  
router.post(
    '/account/create', 
    validator.accountValidation,
    validator.validationHandler,
    accountController.createAccount
)

module.exports = router

