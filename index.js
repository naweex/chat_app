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


app.listen(PORT , () => {
    console.log(`SERVER RUN ON ${PORT}`);
})
