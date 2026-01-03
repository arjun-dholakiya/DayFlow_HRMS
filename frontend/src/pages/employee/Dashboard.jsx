import AppNavbar from '../../components/AppNavbar';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <AppNavbar />

      <Container className="mt-4">
        <h3 className="mb-4">Employee Dashboard</h3>

        <Row>
          <Col md={4}>
            <Card
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/employee/attendance')}
            >
              <Card.Body>
                <Card.Title>Attendance</Card.Title>
                <Card.Text>
                  Check in and check out your daily attendance.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/employee/leave')}
            >
              <Card.Body>
                <Card.Title>Leave</Card.Title>
                <Card.Text>
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
