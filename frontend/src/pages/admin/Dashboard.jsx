import AppNavbar from '../../components/AppNavbar';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <AppNavbar />

      <Container className="mt-5">
        <h3 className="mb-4">Admin Dashboard</h3>

        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Card
              className="shadow-sm border-0"
              style={{
                cursor: 'pointer',
                transition: '0.3s',
                borderRadius: 16
              }}
              onClick={() => navigate('/admin/leave')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow =
                  '0 12px 30px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 .125rem .25rem rgba(0,0,0,.075)';
              }}
            >
              <Card.Body className="text-center p-4">
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: '#0d6efd',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    margin: '0 auto 16px'
                  }}
                >
                  ✓
                </div>

                <Card.Title className="mb-2">Leave Requests</Card.Title>

                <Card.Text className="text-muted">
                  Approve or reject employee leave requests.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
