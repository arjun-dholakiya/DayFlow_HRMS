import { useEffect, useState } from 'react';
import { Container, Card, Table, Button, Alert } from 'react-bootstrap';
import AppNavbar from '../../components/AppNavbar';
import api from '../../api/axios';

export default function LeaveApproval() {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState('');

  // Fetch all leave requests
  const fetchLeaves = async () => {
    try {
      const res = await api.get('/leave/admin-viewAll-leave');
      setLeaves(res.data);
    } catch {
      setError('Failed to load leave requests');
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const approveLeave = async (id) => {
    try {
      await api.put(`/leave/${id}/admin-approve-leave`);
      fetchLeaves();
    } catch {
      setError('Failed to approve leave');
    }
  };

  const rejectLeave = async (id) => {
    try {
      await api.put(`/leave/${id}/admin-reject-leave`);
      fetchLeaves();
    } catch {
      setError('Failed to reject leave');
    }
  };

  return (
    <>
      <AppNavbar />

      <Container className="mt-4">
        <h3 className="mb-3">Leave Requests</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Card>
          <Card.Body>
            <Table bordered>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leaves.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No leave requests
                    </td>
                  </tr>
                ) : (
                  leaves.map((l) => (
                    <tr key={l.id}>
                      <td>{l.User?.name}</td>
                      <td>{l.type}</td>
                      <td>{l.startDate}</td>
                      <td>{l.endDate}</td>
                      <td>{l.status}</td>
                      <td>
                        <Button
                          size="sm"
                          className="me-2"
                          disabled={l.status !== 'Pending'}
                          onClick={() => approveLeave(l.id)}
                        >
                          Approve
                        </Button>

                        <Button
                          size="sm"
                          variant="danger"
                          disabled={l.status !== 'Pending'}
                          onClick={() => rejectLeave(l.id)}
                        >
                          Reject
                        </Button>
                      </td>
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
