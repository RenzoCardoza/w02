const validator = require('express-validator')

const championValidation = [
    validator
        .check('champ_name')
        .trim()
        .exists()
        .isAlpha()
        .isEmpty()
        .withMessage('Invalid Name'),
    
    validator
        .check('champ_alias')
        .trim()
        .exists()
        .isEmpty()
        .withMessage('Invalid Alias'),

    validator
        .check('role')
        .trim()
        .exists()
        .isEmpty()
        .withMessage('A role is required'),

    validator
        .check('difficulty')
        .trim()
        .exists()
        .isEmpty()
        .withMessage('Invalid difficulty level'),

    validator
        .check('lore')
        .trim()
        .exists()
        .isEmpty()
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