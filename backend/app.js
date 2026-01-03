require('dotenv').config();

const express = require('express');
const app = express();
const { sequelize } = require('./database/models');
const morgan = require('morgan');

// All Routes
const authRoutes = require('./modules/v1/auth/routes/authRoutes');

app.use(express.json());
app.use(morgan('dev'));

// Use Of Routes
app.use('/api/v1/auth', authRoutes);

sequelize
  .authenticate()
  .then(() => console.log('Database Connected...'))
  .catch((err) => console.error('Connection Failed') + err);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`));
