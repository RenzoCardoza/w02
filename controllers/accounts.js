const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')

const createAccount = async (req, res) => {
    //#swagger.tags = ['Account']
    let account = {
        account_first_name: req.body.account_first_name,
        account_last_name: req.body.account_last_name,
        account_password: req.body.password, 
        account_email: req.body.email,
    }
    // Hash the password before storing
    let hashedPassword
    try {
        // regular password and cost (salt is generated automatically)
        hashedPassword = await bcrypt.hashSync(account.account_password, 10)
    } catch (error) {
        res.status(500).json(error || 'Something went wrong while storing the account')        
    }
    account = {
        account_first_name: req.body.account_first_name,
        account_last_name: req.body.account_last_name,
        account_password: hashedPassword, 
        account_email: req.body.email,
    }
    
    const response = await mongodb.getDatabase().db('LolBase').collection('accounts').insertOne(account)
    if (response.acknowledged){
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Something went wrong while creating the account')
    }
}

module.exports = { createAccount }