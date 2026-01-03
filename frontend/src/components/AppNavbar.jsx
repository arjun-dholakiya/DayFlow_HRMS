import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { clearAuth, getRole } from '../auth/auth';

export default function AppNavbar() {
  const navigate = useNavigate();
  const role = getRole();

  const logout = () => {
    clearAuth();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand
          style={{ cursor: 'pointer', fontWeight: 600 }}
          onClick={() =>
            role === 'ADMIN' ? navigate('/admin') : navigate('/employee')
          }
        >
          DayFlow
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {role === 'EMPLOYEE' && (
              <>
                <Nav.Link onClick={() => navigate('/employee')}>
                  Dashboard
                </Nav.Link>
                <Nav.Link onClick={() => navigate('/employee/attendance')}>
                  Attendance
                </Nav.Link>
                <Nav.Link onClick={() => navigate('/employee/leave')}>
                  Leave
                </Nav.Link>
              </>
            )}

            {role === 'ADMIN' && (
              <>
                <Nav.Link onClick={() => navigate('/admin')}>
                  Dashboard
                </Nav.Link>
                <Nav.Link onClick={() => navigate('/admin/leave')}>
                  Leave Requests
                </Nav.Link>
              </>
            )}
          </Nav>

          <Button variant="outline-light" size="sm" onClick={logout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
