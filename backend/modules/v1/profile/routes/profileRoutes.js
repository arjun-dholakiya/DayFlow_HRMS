const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileControllers');
const auth = require('../../../../middleware/authMiddleware');
const role = require('../../../../middleware/roleMiddleware');
const validate = require('../../../../middleware/validateMiddleware');
const {
  updateProfileSchema
} = require('../../../../validation/profileValidation');

// Employee routes
router.get('/fetch-profile', auth, profileController.getMyProfile);
router.put(
  '/update-profile',
  auth,
  validate(updateProfileSchema),
  profileController.updateMyProfile
);

// Admin route
router.get(
  '/fetch-employee-profile/:userId',
  auth,
  role('ADMIN'),
  profileController.getProfileByUserId
);

module.exports = router;
