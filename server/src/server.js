const http= require('http');

const {loadPlanetData} = require('./models/planets.models')
const PORT= process.env.PORT || 8000;

const app= require('./app');

const server= http.createServer(app)

async function startServer() {
    await loadPlanetData()

    server.listen(PORT,()=> {
        console.log(`listening on port number ${PORT}...`)
    })

}

startServer();
