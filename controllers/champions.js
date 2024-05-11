const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId

const getAllChamps = async (req, res) => {
    //#swagger.tags = ['Champions']
    const result = await mongodb.getDatabase().db('LolBase').collection('champions').find()
    result.toArray().then((champions, err) => {
        if (err) {
            res.status(400).json({ message: err })
        }
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(champions)
    })
}

const getChamp = async (req, res) =>{
    //#swagger.tags = ['Champions']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Unable to find data with that Id')
    } else {
        const champId = new ObjectId(req.params.id)
        const result = await mongodb.getDatabase().db('LolBase').collection('champions').find({ _id: champId })
        result.toArray().then((champions, err) => {
            if (err) {
                res.status(400).json({ message: err })
            }
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(champions[0])
        }) 
    }
}

const addChamp = async (req, res) => {
    //#swagger.tags = ['Champions']
    const champion = {
        champ_name: req.body.champ_name,
        champ_alias: req.body.champ_alias,
        role: req.body.role,
        difficulty: req.body.difficulty,
        lore: req.body.lore
    }
    const response = await mongodb.getDatabase().db('LolBase').collection('champions').insertOne(champion)
    if (response.acknowledged){
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Something went wrong while inserting the champion')
    }
}

const updateChamp = async (req, res) => {
    //#swagger.tags = ['Champion]
    const champId = new ObjectId(req.params.id)
    const champion = {
        champ_name: req.body.champ_name,
        champ_alias: req.body.champ_alias,
        role: req.body.role,
        difficulty: req.body.difficulty,
        lore: req.body.lore
    }
    const response = await mongodb.getDatabase().db('LolBase').collection('champions').replaceOne({ _id: champId }, champion)
    if (response.modifiedCount > 0){
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Something went wrong with updating the champion')
    }
}

const deleteChamp = async (req, res) => {
    //#swagger.tags = ['Champion']
    const champId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db('LolBase').collection('champions').deleteOne({ _id: champId })
    if (response.deletedCount > 0){
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Something went wrong while deleting the champion')
    }
}

module.exports = {getAllChamps, getChamp, addChamp, updateChamp, deleteChamp}