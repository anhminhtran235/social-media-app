const express = require('express');
const connectDb = require('../config/db');
const http = require('http');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.createServer(app);
setupWebsocket(server);

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
app.use('/newsfeed', require('./routes/newsfeed'));
app.use('/message', require('./routes/message'));

const port = process.env.PORT | 5000;

server.listen(port, () => {
  console.log('Server is listening at port ' + port);
});
