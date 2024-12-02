import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/employee/search', {
        params: { department, position }
      });
      setEmployees(response.data);
    } catch (err) {
      setError('Error searching employees.');
    }
  };

  return (
    <div>
      <h2>Search Employees</h2>
      {error && <p>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Search by Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      <h3>Employee Results</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.first_name} {employee.last_name}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchEmployee;
