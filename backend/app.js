require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const { sequelize } = require('./database/models');

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

// ---------- SERVE FRONTEND (IMPORTANT) ----------
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ---------- DATABASE ----------
sequelize
  .authenticate()
  .then(() => console.log('Database Connected...'))
  .catch((err) => console.error('Connection Failed', err));

// ---------- START SERVER ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
