import AppNavbar from '../../components/AppNavbar';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <AppNavbar />

      <Container className="mt-4">
        <h3 className="mb-4">Admin Dashboard</h3>

        <Row>
          <Col md={4}>
            <Card
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/admin/employees')}
            >
              <Card.Body>
                <Card.Title>Employees</Card.Title>
                <Card.Text>Manage employees and their profiles.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/admin/attendance')}
            >
              <Card.Body>
                <Card.Title>Attendance</Card.Title>
                <Card.Text>Monitor employee attendance records.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/admin/leave')}
            >
              <Card.Body>
                <Card.Title>Leave Requests</Card.Title>
                <Card.Text>
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
