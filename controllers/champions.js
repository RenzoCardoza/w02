const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId

const getAllChamps = async (req, res) => {
    //#swagger.tags = ['Champions']
    const result = await mongodb.getDatabase().db('LolBase').collection('champions').find()
    result.toArray().then((champions) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(champions)
    })
}

const getChamp = async (req, res) =>{
    //#swagger.tags = ['Champions']
    const champId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db('LolBase').collection('champions').find({ _id: champId })
    result.toArray().then((champions) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(champions[0])
    }) 
}

module.exports = {getAllChamps, getChamp}