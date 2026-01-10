const authService = require('../services/authService');

// Register new user (Employee / Admin)
exports.register = async (req, res) => {
  try {
    console.log('REGISTER BODY:', req.body);

    const user = await authService.register(req.body);

    return res.status(201).json({
      message: 'User registered successfully',
      user
    });
  } catch (err) {
    // LOG THE REAL ERROR
    console.error('REGISTER ERROR:', err);

    if (err.message === 'EMAIL_EXISTS') {
      return res.status(400).json({ message: 'Email already exists' });
    }

    if (err.message === 'EMPLOYEE_ID_REQUIRED') {
      return res.status(400).json({
        message: 'Employee ID is required for employee registration'
      });
    }

    // TEMP: expose real error message
    return res.status(500).json({
      message: 'Registration failed',
      error: err.message
    });
  }
};

// Login user and return JWT token
exports.login = async (req, res) => {
  try {
    const { user, token } = await authService.login(req.body);

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    // Invalid email or password
    if (err.message === 'INVALID_CREDENTIALS') {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    return res.status(500).json({ message: 'Login failed' });
  }
};
