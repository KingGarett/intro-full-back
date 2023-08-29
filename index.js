const { log } = require('console')
const http = require('http')

const requestController = () => [
    console.log('ha llegagdo una peticion')
]

const server = http.createServer((req, res) => {
    console.log('recibiendo respuesta')
    res.end('terminando la respuesta')

})

server.listen(4000)