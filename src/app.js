const express = require('express');
const connectDb = require('../config/db');
const http = require('http');
const socketio = require('socket.io');
const setUpWebsocket = require('./websocket');

const app = express();
const server = http.createServer(app);
setUpWebsocket(server);

connectDb();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to our social media app');
});

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));
app.use('/notifications', require('./routes/notifications'));
app.use('/friends', require('./routes/friends'));

const port = process.env.PORT | 5000;

server.listen(port, () => {
  console.log('Server is listening at port ' + port);
});
