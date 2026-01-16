import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  InputGroup
} from 'react-bootstrap';
import { User, Mail, Lock, Briefcase, ChevronRight } from 'lucide-react';
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
      return setError('Please fill in all fields');
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
    <Container fluid className="signup-page-wrapper">
      <Card className="minimal-card border-0 shadow-sm">
        <Card.Body className="p-4 p-md-5">
          <div className="text-center mb-4">
            <h4 className="fw-bold text-primary">Get Started</h4>
            <p className="text-muted small">Create your account to continue</p>
          </div>

          {error && (
            <Alert variant="danger" className="border-0 small text-center">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3">
              <InputGroup className="input-clean">
                <InputGroup.Text className="bg-transparent border-end-0">
                  <User size={18} className="text-secondary" />
                </InputGroup.Text>
                <Form.Control
                  name="name"
                  placeholder="Full Name"
                  className="border-start-0"
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <InputGroup className="input-clean">
                <InputGroup.Text className="bg-transparent border-end-0">
                  <Mail size={18} className="text-secondary" />
                </InputGroup.Text>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="border-start-0"
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <InputGroup className="input-clean">
                <InputGroup.Text className="bg-transparent border-end-0">
                  <Lock size={18} className="text-secondary" />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="border-start-0"
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <InputGroup className="input-clean">
                <InputGroup.Text className="bg-transparent border-end-0">
                  <Briefcase size={18} className="text-secondary" />
                </InputGroup.Text>
                <Form.Select
                  name="role"
                  className="border-start-0"
                  onChange={handleChange}
                >
                  <option value="EMPLOYEE">Employee</option>
                  <option value="ADMIN">Admin</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>

            {form.role === 'EMPLOYEE' && (
              <Form.Group className="mb-4">
                <Form.Control
                  className="input-clean-simple"
                  name="employeeId"
                  placeholder="Employee ID"
                  onChange={handleChange}
                />
              </Form.Group>
            )}

            <Button
              type="submit"
              className="w-100 btn-primary py-2 rounded-3 fw-medium d-flex align-items-center justify-content-center gap-2"
            >
              Sign Up <ChevronRight size={16} />
            </Button>
          </Form>

          <div className="text-center mt-4">
            <span className="text-muted small">Already have an account?</span>{' '}
            <span
              className="small fw-bold text-primary text-decoration-underline"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            >
              Log in
            </span>
          </div>
        </Card.Body>
      </Card>

      <style>{`
        .signup-page-wrapper {
          background-color: #f9fafb;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .minimal-card {
          width: 100%;
          max-width: 400px;
          border-radius: 16px;
        }

        .input-clean .form-control, 
        .input-clean .form-select,
        .input-clean .input-group-text {
          background-color: #f3f4f6;
          border: 1px solid #f3f4f6;
          padding: 0.6rem 0.75rem;
        }

        .input-clean .form-control:focus {
          background-color: #fff;
          border-color: #e5e7eb;
          box-shadow: none;
        }

        .input-clean-simple {
          background-color: #f3f4f6;
          border: 1px solid #f3f4f6;
          padding: 0.6rem 0.75rem;
        }

        .input-clean-simple:focus {
          background-color: #fff;
          border-color: #e5e7eb;
          box-shadow: none;
        }

        .btn-dark {
          background-color: #111827;
          border: none;
          transition: opacity 0.2s ease;
        }

        .btn-dark:hover {
          background-color: #1f2937;
          opacity: 0.9;
        }
      `}</style>
    </Container>
  );
}
