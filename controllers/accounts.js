const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')

const getAllAccounts = async (req, res) => {
    //#swagger.tags = ['Accounts']
    const result = await mongodb.getDatabase().db('LolBase').collection('accounts').find()
    result.toArray().then((champions, err) => {
        if (err) {
            res.status(400).json({ message: err })
        }
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(champions)
    })
}

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

module.exports = { createAccount, getAllAccounts }