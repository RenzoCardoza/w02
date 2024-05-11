const express = require('express')
const router = express.Router()
const champController = require('../controllers/champions')
const validation = require('../middleware/validate')

//get routes
router.get('/', champController.getAllChamps)
router.get('/:id', champController.getChamp)

//post routes
router.post('/', validation.saveChampion, champController.addChamp)

//put route
router.put('/:id', validation.saveChampion, champController.updateChamp)

//delete route
router.delete('/:id', champController.deleteChamp)

module.exports = router