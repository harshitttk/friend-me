const express = require('express');
const { signUp, login } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

// Example protected route
router.get('/protected', protect, (req, res) => {
    res.status(200).json({ message: 'Access granted to protected route', user: req.user });
});

module.exports = router;
