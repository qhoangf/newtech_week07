const http = require('http');
const app = require('./app');
require('dotenv').config();

const { mongoConnect } = require('./services/mongo')
const { loadPlanetsData } = require('./models/planets.model')
const { loadlaunchData } = require('./models/launches.model')

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();
    await loadlaunchData();
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    });
}

startServer();
//....



