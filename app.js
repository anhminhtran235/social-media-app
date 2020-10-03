const express = require('express');
const connectDb = require('./config/db');

const app = express();
connectDb();

app.get('/', (req, res) => {
  res.send('Welcome to our social media app');
});

const port = process.env.PORT | 3000;

app.listen(port, () => {
  console.log('Server is listening at port ' + port);
});
