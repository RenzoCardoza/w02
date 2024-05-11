const express = require("express")
const app = express()
const env = require("dotenv").config()
const mongodb = require('./data/database')
const bodyParser = require("body-parser")

// setup the port listen
const port = process.env.PORT || 3000

// body parser to read from the app
app.use(bodyParser.json())
app.use((req, res, next) =>{
    res.setHeader('Acess-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

//use the routes from the file
app.use("/", require("./routes"))

//access the database
mongodb.initDb((err) =>{
    if(err){
        console.log(err)
    } else {
        app.listen(port, () => {console.log(`Database listening and running on Port:${port}`)})
    }
})