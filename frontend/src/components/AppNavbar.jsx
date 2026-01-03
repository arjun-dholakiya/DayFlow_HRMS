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
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand
          style={{ cursor: 'pointer' }}
          onClick={() => {
            role === 'ADMIN' ? navigate('/admin') : navigate('/employee');
          }}
        >
          DayFlow
        </Navbar.Brand>

        <Nav className="me-auto">
          {role === 'EMPLOYEE' && (
            <Nav.Link onClick={() => navigate('/employee')}>Dashboard</Nav.Link>
          )}

          {role === 'ADMIN' && (
            <Nav.Link onClick={() => navigate('/admin')}>Dashboard</Nav.Link>
          )}
        </Nav>

        <Button variant="outline-light" onClick={logout}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
}
