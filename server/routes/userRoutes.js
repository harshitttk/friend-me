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
router.get('/users', protect, getUsers);

// Search users by username
router.get('/search', protect, searchUsers);

// Fetch friends of the logged-in user
router.get('/friends', protect, getFriends);

// Add a friend
router.post('/friends/add', protect, addFriend);

// Remove a friend
router.post('/friends/remove', protect, removeFriend);

module.exports = router;
