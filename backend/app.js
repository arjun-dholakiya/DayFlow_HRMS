require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const { sequelize } = require('./database/models');

// ✅ CORS MUST COME FIRST
const allowedOrigins = [
  'https://dayfloww-hrms.netlify.app',
  'http://localhost:5173'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // 🔥 VERY IMPORTANT: end preflight here
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

// Body parser AFTER CORS
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Routes
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

// Test routes
app.get('/', (req, res) => {
  res.send('Backend running...');
});

app.get('/api/v1/test', (req, res) => {
  res.json({ success: true });
});

// DB
sequelize
  .authenticate()
  .then(() => console.log('Database Connected...'))
  .catch((err) => console.error('Connection Failed', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`));
