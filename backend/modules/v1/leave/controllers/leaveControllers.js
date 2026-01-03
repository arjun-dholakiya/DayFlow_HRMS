const leaveService = require('../services/leaveServices');

// Employee can apply for leave
exports.applyLeave = async (req, res) => {
  try {
    const leave = await leaveService.applyLeave(req.user.id, req.body);
    return res.status(201).json({
      message: 'Leave applied successfully',
      leave
    });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to apply leave' });
  }
};

// Employee able to view own leaves
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await leaveService.getMyLeaves(req.user.id);
    return res.status(200).json(leaves);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch leaves' });
  }
};

// Admin can able to view all leave requests
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await leaveService.getAllLeaves();
    return res.status(200).json(leaves);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch leave requests' });
  }
};

// Admin can approve leave
exports.approveLeave = async (req, res) => {
  try {
    const leave = await leaveService.approveLeave(req.params.leaveId);
    return res.status(200).json({
      message: 'Leave approved',
      leave
    });
  } catch (err) {
    if (err.message === 'LEAVE_NOT_FOUND') {
      return res.status(404).json({ message: 'Leave not found' });
    }
    return res.status(500).json({ message: 'Failed to approve leave' });
  }
};

// Admin can reject leave
exports.rejectLeave = async (req, res) => {
  try {
    const leave = await leaveService.rejectLeave(req.params.leaveId);
    return res.status(200).json({
      message: 'Leave rejected',
      leave
    });
  } catch (err) {
    if (err.message === 'LEAVE_NOT_FOUND') {
      return res.status(404).json({ message: 'Leave not found' });
    }
    return res.status(500).json({ message: 'Failed to reject leave' });
  }
};
