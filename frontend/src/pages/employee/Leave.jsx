import { useEffect, useState } from 'react';
import { Container, Card, Form, Button, Table, Alert } from 'react-bootstrap';
import AppNavbar from '../../components/AppNavbar';
import api from '../../api/axios';

export default function Leave() {
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({
    type: '',
    startDate: '',
    endDate: '',
    remarks: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch employee leaves
  const fetchLeaves = async () => {
    try {
      const res = await api.get('/leave/view-leave');
      setLeaves(res.data);
    } catch {
      setError('Failed to load leave records');
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const applyLeave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.type || !form.startDate || !form.endDate) {
      return setError('Please fill all required fields');
    }

    try {
      await api.post('/leave/apply-leave', form);
      setSuccess('Leave applied successfully');
      setForm({ type: '', startDate: '', endDate: '', remarks: '' });
      fetchLeaves();
    } catch (err) {
      setError(err.response?.data?.message || 'Leave application failed');
    }
  };

  return (
    <>
      <AppNavbar />

      <Container className="mt-4">
        <h3 className="mb-3">My Leaves</h3>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        {/* Apply leave */}
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Apply Leave</Card.Title>

            <Form onSubmit={applyLeave}>
              <Form.Control
                className="mb-2"
                name="type"
                placeholder="Leave Type (Sick / Paid / Unpaid)"
                value={form.type}
                onChange={handleChange}
              />

              <Form.Control
                className="mb-2"
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />

              <Form.Control
                className="mb-2"
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
              />

              <Form.Control
                className="mb-3"
                name="remarks"
                placeholder="Remarks (optional)"
                value={form.remarks}
                onChange={handleChange}
              />

              <Button type="submit">Apply Leave</Button>
            </Form>
          </Card.Body>
        </Card>

        {/* Leave history */}
        <Card>
          <Card.Body>
            <Card.Title>Leave History</Card.Title>

            <Table bordered>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No leave records
                    </td>
                  </tr>
                ) : (
                  leaves.map((l) => (
                    <tr key={l.id}>
                      <td>{l.type}</td>
                      <td>{l.startDate}</td>
                      <td>{l.endDate}</td>
                      <td>{l.status}</td>
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
