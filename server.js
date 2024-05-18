const express = require("express")
const app = express()
const env = require("dotenv").config()
const mongodb = require('./data/database')
const bodyParser = require("body-parser")
const passport = require('passport')
const session = require('express-session')
const GitHubStrategy = require('passport-github2').Strategy
const cors = require('cors')

// setup the port listen
const port = process.env.PORT || 3000

// body parser to read from the app
app.use(bodyParser.json())
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) =>{
    res.setHeader('Acess-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})
app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
app.use(cors({ origin: '*'}))

//use the routes from the file
app.use("/", require("./routes"))

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    //User.findorCreate({ githubId: profile.id }, function (err, user) {
        return done(null, profile)
    //})
}))

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")})

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user
        res.redirect('/')
    })

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

//access the database
mongodb.initDb((err) =>{
    if(err){
        console.log(err)
    } else {
        app.listen(port, () => {console.log(`Database listening and running on Port:${port}`)})
    }
})