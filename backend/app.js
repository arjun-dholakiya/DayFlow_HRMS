require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const { sequelize } = require('./database/models');

// ---------- CORS (MUST BE FIRST) ----------
const allowedOrigins = [
  'http://localhost:5173', // local frontend (Vite)
  'https://dayfloww-hrms.netlify.app' // Netlify prod
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

// Handle preflight requests
app.options('*', cors());

// ---------- MIDDLEWARE ----------
app.use(express.json());
app.use(morgan('dev'));

// ---------- API ROUTES ----------
const authRoutes = require('./modules/v1/auth/routes/authRoutes');
const adminRoutes = require('./modules/v1/admin/routes/adminRoutes');
const profileRoutes = require('./modules/v1/profile/routes/profileRoutes');
const attendenceRoutes = require('./modules/v1/attendence/routes/attendencRoutes');
const leaveRoutes = require('./modules/v1/leave/routes/leaveRoutes');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/attendence', attendenceRoutes);
app.use('/api/v1/leave', leaveRoutes);

// ---------- HEALTH CHECK ----------
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// ---------- DATABASE ----------
sequelize
  .authenticate()
  .then(() => console.log('Database Connected...'))
  .catch((err) => console.error('Connection Failed', err));

// ---------- GLOBAL ERROR HANDLER ----------
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// ---------- START SERVER ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
