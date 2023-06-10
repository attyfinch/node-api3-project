// require your server and launch it
const server = require('./api/server')

const port = 7770;

server.listen(port, () => {
    console.log(`Port ${port} is open for business. Let's go`)
})
