const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morganMiddleware = require('./src/middlewares/logger');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const port = 3002;

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(morganMiddleware);

app.get('/health', (req, res) => res.send({ message: 'ok' }));

// Routes for authentication and user management
app.use('/', authRoutes);
app.use('/users', userRoutes);

const server = app.listen(port, () => {
  console.log(`Datatys App running on port ${port}.`);
});
module.exports = server;
