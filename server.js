const express = require('express');
const connectDb = require('./config/db');
const http = require('http');
const { setupWebsocket } = require('./websocket');
const path = require('path');

const app = express();
const server = http.createServer(app);
setupWebsocket(server);

connectDb();

app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));
app.use('/notifications', require('./routes/notifications'));
app.use('/friends', require('./routes/friends'));
app.use('/newsfeed', require('./routes/newsfeed'));
app.use('/messages', require('./routes/messages'));

// Serve static assets in production
if (process.env.NODE_ENV === undefined) {
  console.log('Production environment!');
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    console.log(path.resolve(__dirname, 'client', 'build', 'index.html'));
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log('Server is listening at port ' + port);
});
