import { useEffect, useState } from 'react';
import { Container, Card, Button, Alert, Table } from 'react-bootstrap';
import AppNavbar from '../../components/AppNavbar';
import api from '../../api/axios';

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [today, setToday] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch attendance records
  const fetchAttendance = async () => {
    try {
      const res = await api.get('/attendence/view-attendence');
      setAttendance(res.data);

      // Get today's record (if exists)
      const todayDate = new Date().toDateString();
      const todayRecord = res.data.find(
        (a) => new Date(a.date).toDateString() === todayDate
      );
      setToday(todayRecord || null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to load attendance');
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Handle check-in
  const handleCheckIn = async () => {
    setError('');
    setLoading(true);
    try {
      await api.post('/attendence/check-in');
      fetchAttendance();
    } catch (err) {
      setError(err.response?.data?.message || 'Check-in failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle check-out
  const handleCheckOut = async () => {
    setError('');
    setLoading(true);
    try {
      await api.put('/attendence/check-out');
      fetchAttendance();
    } catch (err) {
      setError(err.response?.data?.message || 'Check-out failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppNavbar />

      <Container className="mt-4">
        <h3 className="mb-3">My Attendance</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        {/* Today status */}
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Today</Card.Title>

            <p>
              Status: <strong>{today ? today.status : 'Not Checked In'}</strong>
            </p>

            <Button
              className="me-2"
              onClick={handleCheckIn}
              disabled={!!today || loading}
            >
              Check In
            </Button>

            <Button
              variant="secondary"
              onClick={handleCheckOut}
              disabled={!today || today.checkOut || loading}
            >
              Check Out
            </Button>
          </Card.Body>
        </Card>

        {/* Attendance history */}
        <Card>
          <Card.Body>
            <Card.Title>Attendance History</Card.Title>

            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No attendance records
                    </td>
                  </tr>
                ) : (
                  attendance.map((a) => (
                    <tr key={a.id}>
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
