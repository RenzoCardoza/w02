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

const validationHandler = (req, res, next) => {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    next()
}

module.exports = {championValidation, validationHandler}