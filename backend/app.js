require('dotenv').config();

const express = require('express');
const app = express();
const { sequelize } = require('./database/models');
const morgan = require('morgan');
const cors = require('cors');

// Import routes
const authRoutes = require('./modules/v1/auth/routes/authRoutes');
const adminRoutes = require('./modules/v1/admin/routes/adminRoutes');
const profileRoutes = require('./modules/v1/profile/routes/profileRoutes');
const attendenceRoutes = require('./modules/v1/attendence/routes/attendencRoutes');
const leaveRoutes = require('./modules/v1/leave/routes/leaveRoutes');


app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
// Global middlewares
app.use(express.json());
app.use(morgan('dev'));

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/attendence', attendenceRoutes);
app.use('/api/v1/leave', leaveRoutes);

// Test database connection
sequelize
  .authenticate()
  .then(() => console.log('Database Connected...'))
  .catch((err) => console.error('Connection Failed', err));

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`));
