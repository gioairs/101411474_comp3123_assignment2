const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String },
});

module.exports = mongoose.model('Employee', EmployeeSchema);

