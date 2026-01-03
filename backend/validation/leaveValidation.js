const Joi = require('joi');

// Validation for applying leave
exports.applyLeaveSchema = Joi.object({
  type: Joi.string().valid('Paid', 'Sick', 'Unpaid').required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  remarks: Joi.string().optional()
});
