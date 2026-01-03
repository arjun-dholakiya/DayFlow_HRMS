const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminControllers');
const auth = require('../../../../middleware/authMiddleware');
const role = require('../../../../middleware/roleMiddleware');

// Admin routes
router.get('/viewAll-employees', auth, role('ADMIN'), adminController.getAllEmployees);
router.get('/viewSingle-employee/:userId', auth, role('ADMIN'), adminController.getEmployeeById);

module.exports = router;
