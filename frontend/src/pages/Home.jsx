import { Container, Button, Row, Col, Card, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, getRole } from '../auth/auth';
import { useEffect } from 'react';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      const role = getRole();
      navigate(role === 'ADMIN' ? '/admin' : '/employee');
    }
  }, [navigate]);

  const features = [
    {
      title: 'Attendance Tracking',
      description:
        'Smart check-in and check-out system with accurate daily attendance records.',
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      bgColor: '#EEF2FF',
      iconColor: '#6366F1'
    },
    {
      title: 'Leave Management',
      description:
        'Apply for leaves digitally and track approval status in real time.',
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <polyline points="16 11 18 13 22 9" />
        </svg>
      ),
      bgColor: '#F0F9FF',
      iconColor: '#0EA5E9'
    },
    {
      title: 'Admin Control',
      description:
        'Centralized dashboard to manage employees, approvals, and records securely.',
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      bgColor: '#F5F3FF',
      iconColor: '#8B5CF6'
    }
  ];

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        minHeight: '100vh',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* NAVBAR */}
      <Navbar bg="white" className="py-3 border-bottom sticky-top">
        <Container>
          <Navbar.Brand className="fw-bold fs-3 text-primary">
            DayFlow
          </Navbar.Brand>
          <div>
            <Button
              variant="link"
              className="text-dark text-decoration-none me-3 fw-medium"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              className="rounded-pill px-4 fw-bold shadow-sm"
              style={{ backgroundColor: '#6366F1', border: 'none' }}
              onClick={() => navigate('/signup')}
            >
              Signup
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* HERO */}
      <section className="py-5 mt-4">
        <Container className="text-center">
          <Row className="justify-content-center">
            <Col lg={8}>
              <h1
                className="display-3 fw-bold mb-4"
                style={{ color: '#1E293B', letterSpacing: '-2px' }}
              >
                HR Management{' '}
                <span style={{ color: '#6366F1' }}>Simplified</span>
              </h1>

              <p className="lead text-muted fs-4 mb-5">
                Manage attendance, leaves, and employees with a simple and
                modern HR platform.
              </p>

              <div className="d-flex justify-content-center gap-4">
                <Button
                  size="lg"
                  className="rounded-pill px-5 py-3 fw-bold border-0 shadow"
                  style={{ backgroundColor: '#6366F1' }}
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>

                <Button
                  size="lg"
                  variant="outline-dark"
                  className="rounded-pill px-5 py-3 fw-bold shadow-sm"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold mb-3" style={{ color: '#1E293B' }}>
                Features
              </h2>
              <p className="text-muted fs-5">
                Everything you need to manage your workforce efficiently
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            {features.map((feature, index) => (
              <Col md={4} key={index}>
                <Card className="border-0 shadow-sm h-100 p-4 feature-card">
                  <Card.Body className="text-center">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                      style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: feature.bgColor
                      }}
                    >
                      <span style={{ color: feature.iconColor }}>
                        {feature.icon}
                      </span>
                    </div>

                    <Card.Title className="fw-bold h4 mb-3">
                      {feature.title}
                    </Card.Title>

                    <Card.Text className="text-muted">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <style>{`
        .feature-card {
          transition: all 0.3s ease;
          border-radius: 24px;
        }
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 30px rgba(0,0,0,0.08);
        }
      `}</style>
    </div>
  );
}
