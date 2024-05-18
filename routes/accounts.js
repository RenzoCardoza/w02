const express = require('express')
const router = express.Router()
const accountController = require('../controllers/accounts')
const validator = require('../utilities/accountValidator')

// ROUTES //  
router.get('/', accountController.getAllAccounts)

router.post(
    '/', 
    validator.accountValidation,
    validator.validationHandler,
    accountController.createAccount
)

module.exports = router

