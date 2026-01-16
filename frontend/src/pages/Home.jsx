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
          width="28"
          height="28"
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
          width="28"
          height="28"
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
          width="28"
          height="28"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      bgColor: '#F5F3FF',
      iconColor: '#8B5CF6'
    }
  ];

  return (
    <div className="bg-white min-vh-100">
      {/* NAVBAR */}
      <Navbar bg="white" expand="md" className="py-3 border-bottom sticky-top">
        <Container>
          <Navbar.Brand className="fw-bold fs-3 text-primary">
            DayFlow
          </Navbar.Brand>

          <div className="d-flex gap-3">
            <Button
              variant="link"
              className="text-dark fw-medium text-decoration-none"
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
      <section className="py-5">
        <Container className="text-center">
          <Row className="justify-content-center">
            <Col lg={8}>
              <h1 className="fw-bold mb-4 hero-title">
                HR Management <span className="text-primary">Simplified</span>
              </h1>

              <p className="text-muted fs-5 mb-4">
                Manage attendance, leaves, and employees with a simple and
                modern HR platform.
              </p>

              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                <Button
                  size="lg"
                  className="rounded-pill px-5 fw-bold border-0 shadow"
                  style={{ backgroundColor: '#6366F1' }}
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>

                <Button
                  size="lg"
                  variant="outline-dark"
                  className="rounded-pill px-5 fw-bold shadow-sm"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FEATURES */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="fw-bold">Features</h2>
              <p className="text-muted fs-6">
                Everything you need to manage your workforce efficiently
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            {features.map((feature, index) => (
              <Col lg={4} md={6} key={index}>
                <Card className="border-0 shadow-sm h-100 feature-card">
                  <Card.Body className="text-center p-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{
                        width: '72px',
                        height: '72px',
                        backgroundColor: feature.bgColor,
                        color: feature.iconColor
                      }}
                    >
                      {feature.icon}
                    </div>

                    <Card.Title className="fw-bold mb-2">
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

      {/* STYLES */}
      <style>{`
        .hero-title {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          letter-spacing: -1px;
          color: #1E293B;
        }

        .feature-card {
          border-radius: 22px;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 28px rgba(0,0,0,0.08);
        }
      `}</style>
    </div>
  );
}
