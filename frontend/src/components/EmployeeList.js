import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  TextField,
  Box,
} from '@mui/material';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login'; // Redirect if not authenticated
        return;
      }
      const response = await axios.get('http://localhost:5000/api/v1/employee', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data);
    };

    fetchEmployees();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/v1/employee/search', {
      params: { name: searchTerm },
      headers: { Authorization: `Bearer ${token}` },
    });
    setEmployees(response.data);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Employee List</Typography>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Box component="form" onSubmit={handleSearch} display="flex" alignItems="center" mb={2}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </Box>
      <Button
        variant="contained"
        color="success"
        sx={{ mb: 2 }}
        onClick={() => window.location.href = '/employees/add'}
      >
        Add Employee
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => window.location.href = `/employees/edit/${employee._id}`}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button variant="contained" color="error" sx={{ mr: 1 }}>
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => window.location.href = `/employees/view/${employee._id}`}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EmployeeList;