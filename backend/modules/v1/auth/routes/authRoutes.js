const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const validate = require('../../../../middleware/validateMiddleware');
const {
  registerSchema,
  loginSchema
} = require('../../../../validation/authValidation');

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

module.exports = router;
