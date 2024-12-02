const Employee = require('../models/Employee');

exports.addEmployee = async (req, res) => {
  try {
    const { name, position, department } = req.body;


    if (!name || !position || !department) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newEmployee = new Employee({ name, position, department });
    await newEmployee.save();


    res.status(201).json(newEmployee);
  } catch (err) {
    console.error('Error creating employee:', err);
    res.status(500).json({ error: 'Failed to add employee' });
  }
};


exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update employee' });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete employee' });
  }
};

exports.searchEmployees = async (req, res) => {
  try {
    const { department, position } = req.query;
    const filter = {};

    if (department) filter.department = department;
    if (position) filter.position = position;

    const employees = await Employee.find(filter);
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search employees' });
  }
};


