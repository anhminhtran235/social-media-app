const express = require('express');
const connectDb = require('./config/db');

const app = express();
connectDb();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to our social media app');
});

app.use('/auth', require('./src/routes/auth'));
app.use('/users', require('./src/routes/users'));

const port = process.env.PORT | 3000;

app.listen(port, () => {
  console.log('Server is listening at port ' + port);
});
