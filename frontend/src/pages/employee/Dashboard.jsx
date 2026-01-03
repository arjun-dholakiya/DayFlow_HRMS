import AppNavbar from '../../components/AppNavbar';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  const cardBaseStyle = {
    cursor: 'pointer',
    height: '100%',
    borderRadius: 16,
    transition: '0.3s'
  };

  return (
    <>
      <AppNavbar />

      <Container className="mt-5">
        <h3 className="mb-4">Employee Dashboard</h3>

        <Row className="justify-content-center g-4">
          {/* Attendance */}
          <Col xs={12} md={6} lg={4}>
            <Card
              className="shadow-sm border-0"
              style={cardBaseStyle}
              onClick={() => navigate('/employee/attendance')}
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
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    backgroundColor: '#0d6efd',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    margin: '0 auto 16px'
                  }}
                >
                  ⏱
                </div>

                <Card.Title className="mb-2">Attendance</Card.Title>
                <Card.Text className="text-muted">
                  Check in and check out your daily attendance.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Leave */}
          <Col xs={12} md={6} lg={4}>
            <Card
              className="shadow-sm border-0"
              style={cardBaseStyle}
              onClick={() => navigate('/employee/leave')}
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
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    backgroundColor: '#198754',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    margin: '0 auto 16px'
                  }}
                >
                  🗓
                </div>

                <Card.Title className="mb-2">Leave</Card.Title>
                <Card.Text className="text-muted">
                  Apply for leave and track approval status.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
