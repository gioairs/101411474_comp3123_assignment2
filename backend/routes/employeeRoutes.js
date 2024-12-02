const express = require('express');
const {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
} = require('../controllers/employeeController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, addEmployee);
router.put('/:id', authenticateToken, updateEmployee);
router.delete('/:id', authenticateToken, deleteEmployee);

router.get('/', getEmployees);
router.get('/search', searchEmployees);

module.exports = router;

