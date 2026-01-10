const bcrypt = require('bcryptjs');
const { User, Profile } = require('../../../../database/models');
const { generateToken } = require('../../../../utils/jwt');

// ===============================
// REGISTER USER
// ===============================
exports.register = async (data) => {
  const { employeeId, name, email, password, role } = data;

  // Validate required fields
  if (!name || !email || !password || !role) {
    throw new Error('MISSING_FIELDS');
  }

  // Employee must provide employeeId
  if (role === 'EMPLOYEE' && !employeeId) {
    throw new Error('EMPLOYEE_ID_REQUIRED');
  }

  // Check duplicate email
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('EMAIL_EXISTS');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 🔥 IMPORTANT FIX:
  // Do NOT send employeeId at all for ADMIN
  const userPayload = {
    name,
    email,
    password: hashedPassword,
    role
  };

  if (role === 'EMPLOYEE') {
    userPayload.employeeId = employeeId;
  }

  // Create user
  const user = await User.create(userPayload);

  // Create profile
  await Profile.create({ userId: user.id });

  // Remove password before returning
  const userData = user.toJSON();
  delete userData.password;

  return userData;
};

// ===============================
// LOGIN USER
// ===============================
exports.login = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const token = generateToken({
    id: user.id,
    role: user.role
  });

  const userData = user.toJSON();
  delete userData.password;

  return { user: userData, token };
};
