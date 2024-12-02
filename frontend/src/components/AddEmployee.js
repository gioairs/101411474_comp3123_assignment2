import React, { useState } from 'react';
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
import axios from 'axios';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/employee',
        { name, position, department },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Employee added:', response.data);
      setSuccess(true);
      setName('');
      setPosition('');
      setDepartment('');
      setError('');
    } catch (err) {
      setError('Failed to add employee. Please try again.');
      setSuccess(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Employee
      </Typography>

      <Grid container spacing={3}>
        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Employee Details
            </Typography>
            {error && (
              <Typography variant="body1" color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography variant="body1" color="success.main" sx={{ mb: 2 }}>
                Employee added successfully!
              </Typography>
            )}
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Name"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Position"
                fullWidth
                required
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Department"
                fullWidth
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Preview Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Preview
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1">
              <strong>Name:</strong> {name || 'Not entered'}
            </Typography>
            <Typography variant="body1">
              <strong>Position:</strong> {position || 'Not entered'}
            </Typography>
            <Typography variant="body1">
              <strong>Department:</strong> {department || 'Not entered'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddEmployee;