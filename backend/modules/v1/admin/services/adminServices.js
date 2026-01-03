const { User, Profile } = require('../../../../database/models');

// Get all employees (exclude admins)
exports.getAllEmployees = async () => {
  return User.findAll({
    where: { role: 'EMPLOYEE' },
    attributes: ['id', 'employeeId', 'name', 'email', 'role'],
    include: {
      model: Profile,
      attributes: ['phone', 'address', 'salary']
    }
  });
};

// Get single employee details by userId
exports.getEmployeeById = async (userId) => {
  const user = await User.findOne({
    where: { id: userId, role: 'EMPLOYEE' },
    attributes: ['id', 'employeeId', 'name', 'email', 'role'],
    include: {
      model: Profile,
      attributes: ['phone', 'address', 'salary']
    }
  });

  if (!user) {
    throw new Error('EMPLOYEE_NOT_FOUND');
  }

  return user;
};
