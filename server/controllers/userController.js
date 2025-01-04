const User = require('../models/userModel');
const mongoose = require('mongoose');

// Fetch all users excluding the logged-in user
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user.id } }).select('username');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Search for users by username
exports.searchUsers = async (req, res) => {
    const { query } = req.query;
    try {
        const users = await User.find({
            username: { $regex: query, $options: 'i' },
            _id: { $ne: req.user.id },
        }).select('username');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Fetch the logged-in user's friends
exports.getFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('friends', 'username');
        res.status(200).json(user.friends);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Add a friend
exports.addFriend = async (req, res) => {
    const { friendUsername } = req.body;

    try {
        // Find the friend by username
        const friend = await User.findOne({ username: friendUsername });
        if (!friend) return res.status(404).json({ message: 'User not found' });

        // Get the logged-in user
        const user = await User.findById(req.user.id);

        // Check if the friend is already added
        if (user.friends.includes(friend._id)) {
            return res.status(400).json({ message: 'User is already your friend' });
        }

        // Add friend to the user's friend list
        user.friends.push(friend._id);
        await user.save();

        res.status(200).json({ message: `Friend '${friendUsername}' added successfully!` });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Remove a friend
exports.removeFriend = async (req, res) => {
    const { friendUsername } = req.body;

    try {
        // Find the friend by username
        const friend = await User.findOne({ username: friendUsername });
        if (!friend) return res.status(404).json({ message: 'User not found' });

        // Get the logged-in user
        const user = await User.findById(req.user.id);

        // Remove the friend from the user's friend list
        user.friends = user.friends.filter((id) => id.toString() !== friend._id.toString());
        await user.save();

        res.status(200).json({ message: `Friend '${friendUsername}' removed successfully!` });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
