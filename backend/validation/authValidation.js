const Joi = require('joi');

exports.registerSchema = Joi.object({
  employeeId: Joi.string().when('role', {
    is: 'EMPLOYEE',
    then: Joi.required(),
    otherwise: Joi.optional().allow(null)
  }),
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('EMPLOYEE', 'ADMIN').required()
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
