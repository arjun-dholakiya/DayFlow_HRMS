const adminService = require('../services/adminServices');

// Admin able to view all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await adminService.getAllEmployees();
    return res.status(200).json(employees);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch employees' });
  }
};

// Admin able to view single employee details
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await adminService.getEmployeeById(req.params.userId);
    return res.status(200).json(employee);
  } catch (err) {
    if (err.message === 'EMPLOYEE_NOT_FOUND') {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.status(500).json({ message: 'Failed to fetch employee' });
  }
};
