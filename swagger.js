const swaggerAutogen = require('swagger-autogen')

const doc = {
    info: {
        title: 'League of Legends API',
        description: 'This is an API retrieves data regarding the champions of League of Legends'
    },
    host: 'localhost:3000',
    schemes: ['https', 'http']
}

const outputFile = './swagger.json'
const endPointsFiles = ['./routes/index.js']

//this will generate the swagger.json
swaggerAutogen(outputFile, endPointsFiles, doc)