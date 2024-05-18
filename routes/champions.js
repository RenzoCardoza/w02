const express = require('express')
const router = express.Router()
const champController = require('../controllers/champions')
const validator = require('../utilities/validate')

const { isAuthenticated } = require('../middleware/authenticate')

//get routes
router.get('/', champController.getAllChamps)
router.get('/:id', champController.getChamp)

//post routes
router.post(
    '/', 
    isAuthenticated,
    validator.championValidation, 
    validator.validationHandler, 
    champController.addChamp
)

//put route
router.put(
    '/:id',
    isAuthenticated,
    validator.championValidation,
    validator.validationHandler, 
    champController.updateChamp
)

//delete route
router.delete(
    '/:id', 
    isAuthenticated,
    champController.deleteChamp
)

module.exports = router