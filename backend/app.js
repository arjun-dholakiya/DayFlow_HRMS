require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const { sequelize } = require('./database/models');

// ---------- CORS ----------
const allowedOrigins = [
  'http://localhost:5173',
  'https://dayfloww-hrms.netlify.app'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// ---------- MIDDLEWARE ----------
app.use(express.json());
app.use(morgan('dev'));

// ---------- API ROUTES ----------
app.use('/api/v1/auth', require('./modules/v1/auth/routes/authRoutes'));
app.use('/api/v1/admin', require('./modules/v1/admin/routes/adminRoutes'));
app.use(
  '/api/v1/profile',
  require('./modules/v1/profile/routes/profileRoutes')
);
app.use(
  '/api/v1/attendence',
  require('./modules/v1/attendence/routes/attendencRoutes')
);
app.use('/api/v1/leave', require('./modules/v1/leave/routes/leaveRoutes'));

// ---------- HEALTH CHECK ----------
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// ---------- DATABASE ----------
sequelize
  .authenticate()
  .then(() => console.log('Database Connected...'))
  .catch((err) => console.error('Connection Failed', err));

// ---------- START SERVER ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
