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
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import api from '../api/axios';
import { setAuth, clearAuth } from './auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      setAuth(res.data.token, res.data.user.role);

      res.data.user.role === 'ADMIN'
        ? navigate('/admin')
        : navigate('/employee');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <Container fluid className="login-page-wrapper">
      <Card className="minimal-card border-0 shadow-sm">
        <Card.Body className="p-4 p-md-5">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-primary mb-1">DayFlow</h3>
            <p className="text-muted small">Welcome back, please login.</p>
          </div>

          {error && (
            <Alert variant="danger" className="border-0 small text-center py-2">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <InputGroup className="input-clean">
                <InputGroup.Text className="bg-transparent border-end-0">
                  <Mail size={18} className="text-secondary" />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  className="border-start-0"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <InputGroup className="input-clean">
                <InputGroup.Text className="bg-transparent border-end-0">
                  <Lock size={18} className="text-secondary" />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="border-start-0"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Button
              type="submit"
              className="w-100 btn-primary py-2 rounded-3 fw-medium d-flex align-items-center justify-content-center gap-2"
            >
              Sign In <ArrowRight size={16} />
            </Button>
          </Form>

          <div className="text-center mt-4">
            <span className="text-muted small">New to DayFlow?</span>{' '}
            <span
              className="small fw-bold text-primary text-decoration-underline"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/signup')}
            >
              Create account
            </span>
          </div>
        </Card.Body>
      </Card>

      <style>{`
        .login-page-wrapper {
          background-color: #f9fafb;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .minimal-card {
          width: 100%;
          max-width: 400px;
          border-radius: 20px;
        }

        .login-icon-circle {
          width: 50px;
          height: 50px;
          background-color: #f3f4f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .input-clean .form-control, 
        .input-clean .input-group-text {
          background-color: #f3f4f6;
          border: 1px solid #f3f4f6;
          padding: 0.65rem 0.75rem;
        }

        .input-clean .form-control:focus {
          background-color: #fff;
          border-color: #e5e7eb;
          box-shadow: none;
        }

        .btn-dark {
          background-color: #111827;
          border: none;
          transition: transform 0.1s ease, background-color 0.2s ease;
        }

        .btn-dark:hover {
          background-color: #1f2937;
        }

        .btn-dark:active {
          transform: scale(0.98);
        }
      `}</style>
    </Container>
  );
}
