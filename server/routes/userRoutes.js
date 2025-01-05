const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const {
    getUsers,
    searchUsers,
    getFriends,
    addFriend,
    removeFriend,
} = require('../controllers/userController');

const router = express.Router();

// Fetch all users (excluding logged-in user)
router.get('/', protect, getUsers);

// Search users by username
router.get('/search', protect, searchUsers);

// Fetch friends of the logged-in user
router.get('/friends', protect, getFriends);

// Add a friend
router.post('/friends/:id', protect, addFriend);

// Remove a friend
router.delete('/friends/:id', protect, removeFriend);

module.exports = router;
