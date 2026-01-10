import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import api from '../api/axios';
import { clearAuth } from './auth';

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'EMPLOYEE',
    employeeId: ''
  });

  // 🔥 Clear old auth on signup page
  useEffect(() => {
    clearAuth();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password) {
      return setError('All fields are required');
    }

    if (form.role === 'EMPLOYEE' && !form.employeeId.trim()) {
      return setError('Employee ID is required');
    }

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role
    };

    if (form.role === 'EMPLOYEE') {
      payload.employeeId = form.employeeId.trim();
    }

    try {
      await api.post('/auth/register', payload);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '28rem', borderRadius: 12 }}>
        <Card.Body>
          <h3 className="text-center mb-3">Create Account</h3>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSignup}>
            <Form.Control
              className="mb-2"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />

            <Form.Control
              className="mb-2"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />

            <Form.Control
              className="mb-2"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />

            <Form.Select className="mb-2" name="role" onChange={handleChange}>
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </Form.Select>

            {form.role === 'EMPLOYEE' && (
              <Form.Control
                className="mb-3"
                name="employeeId"
                placeholder="Employee ID"
                onChange={handleChange}
              />
            )}

            <Button type="submit" className="w-100">
              Signup
            </Button>
          </Form>

          <p className="text-center mt-3">
            Already have an account?{' '}
            <span
              style={{ color: '#0d6efd', cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}
