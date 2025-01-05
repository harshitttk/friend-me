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
    try {
        const userId = req.user.id; // Logged-in user's ID
        const friendId = req.params.id; // Friend's ID from request parameters
    
        if (userId === friendId) {
          return res.status(400).json({ message: "You can't add yourself as a friend." });
        }
    
        // Find the logged-in user and the potential friend
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);
    
        if (!user || !friend) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Check if they are already friends
        if (user.friends.includes(friendId)) {
          return res.status(400).json({ message: "You are already friends." });
        }
    
        // Add the friend to the user's friends list and vice versa
        user.friends.push(friendId);
        friend.friends.push(userId);
    
        await user.save();
        await friend.save();
    
        res.status(200).json({ message: "Friend added successfully" });
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      }
};

// Remove a friend
exports.removeFriend = async (req, res) => {
    try {
        const userId = req.user.id; // Logged-in user's ID
        const friendId = req.params.id; // Friend's ID from request parameters
    
        if (userId === friendId) {
          return res.status(400).json({ message: "You can't remove yourself as a friend." });
        }
    
        // Find the logged-in user and the friend
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);
    
        if (!user || !friend) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Check if they are already friends
        if (!user.friends.includes(friendId)) {
          return res.status(400).json({ message: "You are not friends with this user." });
        }
    
        // Remove the friend from both the user's and friend's friends list
        user.friends.pull(friendId);
        friend.friends.pull(userId);
    
        await user.save();
        await friend.save();
    
        res.status(200).json({ message: "Friend removed successfully" });
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      }
};
