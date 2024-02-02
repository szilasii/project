const Websocket = require('ws');

const clients = new Set();

const server = new Websocket.Server({ port: 8081})
server.on ('connection',(socket) => {

        clients.add(socket)

    socket.on('message', (message)=> {
            console.log(`${message}`)
            //socket.send(`Valasz tanar: ${message}`)
            broadcast(message,socket)
        })

   
    socket.on('close',() => {
        clients.delete(socket)
    })
})

function broadcast(message,sender) {
    for (const client of clients) {
        if (client != sender) {
            client.send(message)
        }
    }
}