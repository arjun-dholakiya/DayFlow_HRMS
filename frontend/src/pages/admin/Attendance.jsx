import { useEffect, useState } from 'react';
import { Container, Card, Table, Alert } from 'react-bootstrap';
import AppNavbar from '../../components/AppNavbar';
import api from '../../api/axios';

export default function AdminAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState('');

  const fetchAttendance = async () => {
    try {
      const res = await api.get('/attendence/admin-viewAll-attendence');
      setAttendance(res.data);
    } catch {
      setError('Failed to load attendance records');
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <>
      <AppNavbar />

      <Container className="mt-4">
        <h3 className="mb-3">Employee Attendance</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Card>
          <Card.Body>
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Employee ID</th>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No attendance records
                    </td>
                  </tr>
                ) : (
                  attendance.map((a) => (
                    <tr key={a.id}>
                      <td>{a.User?.name}</td>
                      <td>{a.User?.employeeId || '-'}</td>
                      <td>{new Date(a.date).toLocaleDateString()}</td>
                      <td>{a.checkIn || '-'}</td>
                      <td>{a.checkOut || '-'}</td>
                      <td>{a.status}</td>
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
