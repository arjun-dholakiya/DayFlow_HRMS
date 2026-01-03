const attendanceService = require('../services/attendenceServices');

// Employee can check-in
exports.checkIn = async (req, res) => {
  try {
    const attendance = await attendanceService.checkIn(req.user.id);
    return res.status(201).json({
      message: 'Check-in successful',
      attendance
    });
  } catch (err) {
    if (err.message === 'ALREADY_CHECKED_IN') {
      return res.status(400).json({ message: 'Already checked in today' });
    }
    return res.status(500).json({ message: 'Check-in failed' });
  }
};

// Employee can check-out
exports.checkOut = async (req, res) => {
  try {
    const attendance = await attendanceService.checkOut(req.user.id);
    return res.status(200).json({
      message: 'Check-out successful',
      attendance
    });
  } catch (err) {
    if (err.message === 'CHECK_IN_REQUIRED') {
      return res.status(400).json({ message: 'Please check in first' });
    }
    if (err.message === 'ALREADY_CHECKED_OUT') {
      return res.status(400).json({ message: 'Already checked out today' });
    }
    return res.status(500).json({ message: 'Check-out failed' });
  }
};

// Employee able view own attendance
exports.getMyAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.getMyAttendance(req.user.id);
    return res.status(200).json(attendance);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch attendance' });
  }
};

// Admin able view all attendance
exports.getAllAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.getAllAttendance();
    return res.status(200).json(attendance);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch attendance' });
  }
};
