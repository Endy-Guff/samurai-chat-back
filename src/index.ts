import express from 'express'
import http from 'http'
import { Server } from "socket.io"
import cors from 'cors'

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }});
app.use(cors())
const PORT = process.env.PORT || 3009

const messages = [
    {id: 'qwert1', message: 'Hi!', user: {id: 'ww1', name: 'Ivan'}},
    {id: 'qwert2', message: 'WhatsUp', user: {id: 'ww2', name: 'Ignat'}}
]

app.get('/', (req, res) => {
    res.send('Hi!')
});

io.on('connection', (socket) => {
    socket.on('socket-message-send', (message: string)=>{
        messages.push({id: 'id234', message, user: {id: 'ww1', name: 'Ivan'}})
        socket.emit('init-messages', messages)
    })

    socket.emit('init-messages', messages)

    console.log('a user connected');
});

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});