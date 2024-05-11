const express = require('express')
const router = express.Router()
const champController = require('../controllers/champions')
// const validation = require('../middleware/validate')
const validator = require('../utilities/validate')

//get routes
router.get('/', champController.getAllChamps)
router.get('/:id', champController.getChamp)

//post routes
router.post(
    '/', 
    validator.championValidation, 
    validator.validationHandler, 
    champController.addChamp
)

//put route
router.put(
    '/:id',
    validator.championValidation,
    validator.validationHandler, 
    champController.updateChamp
)

//delete route
router.delete('/:id', champController.deleteChamp)

module.exports = router