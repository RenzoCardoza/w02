const validator = require('express-validator')

const championValidation = [
    validator
        .check('champ_name')
        .trim()
        .exists()
        .isLength({ min: 3 })
        .isString()
        .withMessage('Invalid Name'),
    
    validator
        .check('champ_alias')
        .trim()
        .exists()
        .isLength({ min: 3 })
        .withMessage('Invalid Alias'),

    validator
        .check('role')
        .trim()
        .exists()
        .isLength({ min: 3 })
        .isString()
        .withMessage('A role is required'),

    validator
        .check('difficulty')
        .trim()
        .exists()
        .isLength({ min: 3 })
        .isString()
        .withMessage('Invalid difficulty level'),

    validator
        .check('lore')
        .trim()
        .exists()
        .isLength({ min: 3 })
        .isString()
        .withMessage('please insert the lore for the champion')
]

const accountValidation = [
    validator  
        .check('account_first_name')
        .trim()
        .exists()
        .isLength({ min: 2, max: 15 })
        .isString()
        .withMessage('Please enter a first name for the account owner'),
    
    validator
        .check('account_last_name')
        .trim()
        .exists()
        .isLength({ min: 2, max: 15 })
        .isString()
        .withMessage('Please enter a last name for the account owner'),
    
    validator
        .check('account_password')
        .trim()
        .exists()
        .isStrongPassword({
            minLength: 10,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
        .withMessage('Password does not meet requirements, Please try again'),
    
    validator
        .check('account_email')
        .trim()
        .exists()
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter a valid e-mail')
]

const validationHandler = (req, res, next) => {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    next()
}

module.exports = {championValidation, accountValidation, validationHandler}