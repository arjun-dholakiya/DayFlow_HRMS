import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import api from '../api/axios';
import { setAuth, clearAuth, isLoggedIn, getRole } from './auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 🔥 Clear old auth when visiting login page
  useEffect(() => {
    clearAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      return setError('Email and password are required');
    }

    try {
      const res = await api.post('/auth/login', { email, password });

      // Save fresh auth
      setAuth(res.data.token, res.data.user.role);

      // Correct role-based redirect
      res.data.user.role === 'ADMIN'
        ? navigate('/admin')
        : navigate('/employee');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '26rem', borderRadius: 12 }}>
        <Card.Body>
          <h3 className="text-center mb-1">DayFlow</h3>
          <p className="text-center text-muted mb-4">
            Human Resource Management System
          </p>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Control
              className="mb-3"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Form.Control
              className="mb-3"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" className="w-100">
              Login
            </Button>
          </Form>

          <p className="text-center mt-3">
            Don’t have an account?{' '}
            <span
              style={{ color: '#0d6efd', cursor: 'pointer' }}
              onClick={() => navigate('/signup')}
            >
              Signup
            </span>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}
