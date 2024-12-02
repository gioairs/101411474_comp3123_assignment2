import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Grid,
  Divider,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEmployee = () => {
  const { id } = useParams(); // Get employee ID from URL params
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const [updatedEmployee, setUpdatedEmployee] = useState({
    name: '',
    position: '',
    department: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/v1/employee/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployee(response.data);
        setUpdatedEmployee({
          name: response.data.name,
          position: response.data.position,
          department: response.data.department,
        });
      } catch (err) {
        setError('Failed to fetch employee details.');
      }
    };

    fetchEmployee();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/api/v1/employee/${id}`, updatedEmployee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(true);
      setError('');
    } catch (err) {
      setError('Failed to update employee. Please try again.');
      setSuccess(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Edit Employee
      </Typography>

      <Grid container spacing={3}>
        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Edit Details
            </Typography>
            {error && (
              <Typography variant="body1" color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography variant="body1" color="success.main" sx={{ mb: 2 }}>
                Employee updated successfully!
              </Typography>
            )}
            <Box component="form" onSubmit={handleUpdate}>
              <TextField
                label="Name"
                fullWidth
                required
                value={updatedEmployee.name}
                onChange={(e) =>
                  setUpdatedEmployee({ ...updatedEmployee, name: e.target.value })
                }
                margin="normal"
              />
              <TextField
                label="Position"
                fullWidth
                required
                value={updatedEmployee.position}
                onChange={(e) =>
                  setUpdatedEmployee({ ...updatedEmployee, position: e.target.value })
                }
                margin="normal"
              />
              <TextField
                label="Department"
                fullWidth
                required
                value={updatedEmployee.department}
                onChange={(e) =>
                  setUpdatedEmployee({ ...updatedEmployee, department: e.target.value })
                }
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Save Changes
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Summary Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" gutterBottom>
              <strong>Current Name:</strong> {employee.name || 'Loading...'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Updated Name:</strong> {updatedEmployee.name || 'Not entered'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Current Position:</strong> {employee.position || 'Loading...'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Updated Position:</strong> {updatedEmployee.position || 'Not entered'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Current Department:</strong> {employee.department || 'Loading...'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Updated Department:</strong> {updatedEmployee.department || 'Not entered'}
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/employees')}
              sx={{ mt: 2 }}
              fullWidth
            >
              Cancel
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditEmployee;
