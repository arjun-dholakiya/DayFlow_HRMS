require('dotenv').config();

const express = require('express');
const app = express();
const { sequelize } = require('./database/models');
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('dev'));

sequelize
  .authenticate()
  .then(() => console.log('Database Connected...'))
  .catch((err) => console.error('Connection Failed') + err);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`));
