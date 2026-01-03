const express = require('express');
const router = express.Router();

const leaveController = require('../controllers/leaveControllers');
const auth = require('../../../../middleware/authMiddleware');
const role = require('../../../../middleware/roleMiddleware');
const validate = require('../../../../middleware/validateMiddleware');
const { applyLeaveSchema } = require('../../../../validation/leaveValidation');

// Employee routes
router.post('/apply-leave', auth, validate(applyLeaveSchema), leaveController.applyLeave);
router.get('/view-leave', auth, leaveController.getMyLeaves);

// Admin routes
router.get('/admin-viewAll-leave', auth, role('ADMIN'), leaveController.getAllLeaves);
router.put('/:leaveId/admin-approve-leave', auth, role('ADMIN'), leaveController.approveLeave);
router.put('/:leaveId/admin-reject-leave', auth, role('ADMIN'), leaveController.rejectLeave);

module.exports = router;
