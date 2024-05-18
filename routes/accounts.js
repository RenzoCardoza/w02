const express = require('express')
const router = express.Router()
const accountController = require('../controllers/accounts')
const validator = require('../utilities/accountValidator')

const { isAuthenticated } = require('../middleware/authenticate')

// ROUTES //  
router.post(
    '/', 
    validator.accountValidation,
    validator.validationHandler,
    accountController.createAccount
)

router.put(
    '/:id',
    isAuthenticated,
    validator.accountValidation,
    validator.validationHandler,
    accountController.updateAccount
)

router.delete(
    '/:id',
    isAuthenticated,
    accountController.deleteAccount
)

module.exports = router

