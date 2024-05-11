const express = require('express')
const router = express.Router()
const champController = require('../controllers/champions')

//get routes
router.get('/', champController.getAllChamps)
router.get('/:id', champController.getChamp)

//post routes
// router.post('/', champController.addChamp)

module.exports = router