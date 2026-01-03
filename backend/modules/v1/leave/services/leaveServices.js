const { Leave, User } = require('../../../../database/models');

// Employee can apply for leave
exports.applyLeave = async (userId, data) => {
  const { type, startDate, endDate, remarks } = data;

  const leave = await Leave.create({
    userId,
    type,
    startDate,
    endDate,
    remarks,
    status: 'Pending'
  });

  return leave;
};

// Employee able view own leave requests
exports.getMyLeaves = async (userId) => {
  return Leave.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']]
  });
};

// Admin can view all leave requests
exports.getAllLeaves = async () => {
  return Leave.findAll({
    include: {
      model: User,
      attributes: ['id', 'employeeId', 'name', 'email']
    },
    order: [['createdAt', 'DESC']]
  });
};

// Admin is approve the leave
exports.approveLeave = async (leaveId) => {
  const leave = await Leave.findByPk(leaveId);

  if (!leave) {
    throw new Error('LEAVE_NOT_FOUND');
  }

  leave.status = 'Approved';
  await leave.save();

  return leave;
};

// Admin can reject leave
exports.rejectLeave = async (leaveId) => {
  const leave = await Leave.findByPk(leaveId);

  if (!leave) {
    throw new Error('LEAVE_NOT_FOUND');
  }

  leave.status = 'Rejected';
  await leave.save();

  return leave;
};
