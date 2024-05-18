const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')

const createAccount = async (req, res) => {
    let account = {
        account_first_name: req.body.account_first_name,
        account_last_name: req.body.account_last_name,
        account_password: bcrypt.hashSync(req.body.account_password, 10), 
        account_email: req.body.account_email,
    }
    const response = await mongodb.getDatabase().db('LolBase').collection('accounts').insertOne(account)
    if (response.acknowledged){
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Something went wrong while creating the account')
    }
}

const updateAccount = async (req, res) => {
    //#swagger.tags = ['Champions']
    const accId = new ObjectId(req.params.id)
    let account = {
        account_first_name: req.body.account_first_name,
        account_last_name: req.body.account_last_name,
        account_password: bcrypt.hashSync(req.body.account_password, 10), 
        account_email: req.body.account_email,
    }
    const response = await mongodb.getDatabase().db('LolBase').collection('accounts').replaceOne({ _id: accId }, account)
    if (response.modifiedCount > 0){
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Something went wrong with updating the account')
    }
}

const deleteAccount = async (req, res) => {
    //#swagger.tags = ['Champions']
    const accId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db('LolBase').collection('accounts').deleteOne({ _id: accId })
    if (response.deletedCount > 0){
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Something went wrong while deleting the account')
    }
}

module.exports = { createAccount, updateAccount, deleteAccount }