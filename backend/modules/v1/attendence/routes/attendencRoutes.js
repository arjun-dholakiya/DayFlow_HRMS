const express = require('express');
const router = express.Router();

const attendenceController = require('../controllers/attendenceControllers');
const auth = require('../../../../middleware/authMiddleware');
const role = require('../../../../middleware/roleMiddleware');

// Employee routes
router.post('/check-in', auth, attendenceController.checkIn);
router.put('/check-out', auth, attendenceController.checkOut);
router.get('/view-attendence', auth, attendenceController.getMyAttendance);

// Admin route
router.get(
  '/admin-viewAll-attendence',
  auth,
  role('ADMIN'),
  attendenceController.getAllAttendance
);

module.exports = router;
