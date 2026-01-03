const bcrypt = require('bcryptjs');
const { User, Profile } = require('../../../../database/models');
const { generateToken } = require('../../../../utils/jwt');

// Handle user registration logic
exports.register = async (data) => {
  const { employeeId, name, email, password, role } = data;

  // employeeId required only for EMPLOYEE role
  if (role === 'EMPLOYEE' && !employeeId) {
    throw new Error('EMPLOYEE_ID_REQUIRED');
  }

  const finalEmployeeId = role === 'EMPLOYEE' ? employeeId : null;

  // Prevent duplicate email
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('EMAIL_EXISTS');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    employeeId: finalEmployeeId,
    name,
    email,
    password: hashedPassword,
    role
  });

  // Create empty profile for user
  await Profile.create({ userId: user.id });

  // Remove password before returning data
  const userData = user.toJSON();
  delete userData.password;

  return userData;
};

// Handle login logic
exports.login = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('INVALID_CREDENTIALS');
  }

  // Generate JWT token
  const token = generateToken({
    id: user.id,
    role: user.role
  });

  const userData = user.toJSON();
  delete userData.password;

  return { user: userData, token };
};
