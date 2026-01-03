import { useEffect, useState } from 'react';
import { Container, Card, Table, Alert } from 'react-bootstrap';
import AppNavbar from '../../components/AppNavbar';
import api from '../../api/axios';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  // Fetch all employees (ADMIN only)
  const fetchEmployees = async () => {
    try {
      const res = await api.get('/admin/viewAll-employees');
      setEmployees(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load employees');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <AppNavbar />

      <Container className="mt-4">
        <h3 className="mb-3">Employees</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Card>
          <Card.Body>
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>

              <tbody>
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No employees found
                    </td>
                  </tr>
                ) : (
                  employees.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.id}</td>
                      <td>{emp.employeeId || '-'}</td>
                      <td>{emp.name}</td>
                      <td>{emp.email}</td>
                      <td>{emp.role}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
