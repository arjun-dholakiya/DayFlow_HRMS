const { Attendance, User } = require('../../../../database/models');
const { Op } = require('sequelize');

// Employee can check-in for today
exports.checkIn = async (userId) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  // Check if already checked in today
  const existingAttendance = await Attendance.findOne({
    where: {
      userId,
      date: {
        [Op.between]: [startOfDay, endOfDay]
      }
    }
  });

  if (existingAttendance) {
    throw new Error('ALREADY_CHECKED_IN');
  }

  // Create new attendance record
  const attendance = await Attendance.create({
    userId,
    date: new Date(),
    checkIn: new Date(),
    status: 'Present'
  });

  return attendance;
};

// Employee can check-out for today
exports.checkOut = async (userId) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const attendance = await Attendance.findOne({
    where: {
      userId,
      date: {
        [Op.between]: [startOfDay, endOfDay]
      }
    }
  });

  if (!attendance) {
    throw new Error('CHECK_IN_REQUIRED');
  }

  if (attendance.checkOut) {
    throw new Error('ALREADY_CHECKED_OUT');
  }

  attendance.checkOut = new Date();
  await attendance.save();

  return attendance;
};

// Employee able view own attendance records
exports.getMyAttendance = async (userId) => {
  return Attendance.findAll({
    where: { userId },
    order: [['date', 'DESC']]
  });
};

// Admin able view all attendance records
exports.getAllAttendance = async () => {
  return Attendance.findAll({
    include: {
      model: User,
      attributes: ['id', 'employeeId', 'name', 'email']
    },
    order: [['date', 'DESC']]
  });
};
