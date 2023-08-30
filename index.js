require("dotenv").congif()
const http = require('http')

const requestController = () => [
    console.log('ha llegagdo una peticion')
]

const server = http.createServer((req, res) => {
    res.end('terminando la respuesta')
    requestController()
})

const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log('corriendo en puerto:' + 4000)
})