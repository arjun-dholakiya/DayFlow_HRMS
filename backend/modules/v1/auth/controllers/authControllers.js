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
    // 🔥 THIS IS THE KEY
    console.error('REGISTER ERROR STACK:', err);

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
