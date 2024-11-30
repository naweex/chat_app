const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const redis = require('redis');
const redisClient = redis.createClient();
app.set('veiw engine' , 'ejs');
const server = http.createServer(app);
const PORT = 4000;
const io = socketIO(server , {cors : {origin : '*'}});
io.on('connection' , socket => {
    const redisMulti = redisClient.multi()
    socket.on('message' , ({username , message}) => {
        redisMulti.rPush('messages' , `${username}:${message}`)
        io.emit('message' , {username , message})
    })
})
app.get('/' , (req , res) => {
    res.render('login.ejs')
})
app.get('/chat' , (req , res) =>{
    const {username} = req.query;
    res.render('chat.ejs' , {username})
})
app.listen(PORT , () => {
    console.log(`SERVER RUN ON http://localhost:${PORT}`);
})
