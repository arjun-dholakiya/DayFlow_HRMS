const Joi = require('joi');

// Validation for updating profile
exports.updateProfileSchema = Joi.object({
  phone: Joi.string().min(10).max(15).optional(),
  address: Joi.string().min(5).optional(),
  salary: Joi.number().integer().optional()
});
