const express = require('express');
const { signup, login } = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/profile', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Profile data', user: req.user });
});

router.put('/profile', authenticateToken, (req, res) => {

  res.status(200).json({ message: 'User updated' });
});

router.delete('/profile', authenticateToken, (req, res) => {

  res.status(200).json({ message: 'User deleted' });
});

module.exports = router;



