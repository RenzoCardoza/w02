const express = require('express')
const router = express.Router()
const accountController = require('../controllers/accounts')
const validator = require('../utilities/accountValidator')

// ROUTES //  
router.post(
    '/create', 
    validator.accountValidation,
    validator.validationHandler,
    accountController.createAccount
)

module.exports = router

