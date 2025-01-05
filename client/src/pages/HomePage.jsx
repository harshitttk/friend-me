import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance"; // Import the axios instance
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Unauthorized access! Please log in.");
        navigate("/login");
        setLoading(false);
        return;
      }

      try {
        // Fetch all users using the axios instance
        const usersResponse = await axiosInstance.get("/users");
        setUsers(usersResponse.data);
        setFilteredUsers(usersResponse.data);

        // Fetch friends list using the axios instance
        const friendsResponse = await axiosInstance.get("/users/friends");
        setFriends(friendsResponse.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered =
      view === "all"
        ? users.filter((user) => user.username.toLowerCase().includes(query))
        : friends.filter((friend) =>
            friend.username.toLowerCase().includes(query)
          );

    setFilteredUsers(filtered);
  };

  const toggleView = (view) => {
    setView(view);
    setSearchQuery(""); // Reset search query
    setFilteredUsers(view === "all" ? users : friends);
  };

  const addFriend = async (friendId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in first!");
      return;
    }

    try {
      const response = await axiosInstance.post(`/users/friends/${friendId}`);
      toast.success(response.data.message);

      // Update the friends list
      const newFriend = users.find((user) => user._id === friendId);
      setFriends((prevFriends) => [...prevFriends, newFriend]);

      if (view === "friends") {
        setFilteredUsers((prevUsers) => [...prevUsers, newFriend]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding friend");
    }
  };

  const removeFriend = async (friendId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in first!");
      return;
    }

    try {
      const response = await axiosInstance.delete(`/users/friends/${friendId}`);
      toast.success(response.data.message);

      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend._id !== friendId)
      );

      if (view === "friends") {
        setFilteredUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== friendId)
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error removing friend");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <ClipLoader color="#3b82f6" size={50} />
          <p className="text-gray-500 mt-4">Fetching data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Registered Users</h1>

      {/* Toggle Buttons */}
      <div className="mb-6">
        <button
          onClick={() => toggleView("all")}
          className={`px-4 py-2 mr-2 rounded ${
            view === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All Users
        </button>
        <button
          onClick={() => toggleView("friends")}
          className={`px-4 py-2 rounded ${
            view === "friends" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Friends
        </button>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder={`Search ${view === "all" ? "users" : "friends"}...`}
        className="mb-6 p-2 border border-gray-300 rounded w-96"
        value={searchQuery}
        onChange={handleSearch}
      />

      {/* Users/Friends List */}
      <ul className="bg-white shadow-md rounded px-8 py-6 w-96">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li
              key={user._id}
              className="border-b py-2 flex justify-between items-center"
            >
              <span>{user.username}</span>
              {view === "all" &&
                !friends.some((friend) => friend._id === user._id) && (
                  <button
                    onClick={() => addFriend(user._id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                  >
                    Add Friend
                  </button>
                )}
              {view === "friends" && (
                <button
                  onClick={() => removeFriend(user._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Remove Friend
                </button>
              )}
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No {view} found</li>
        )}
      </ul>
      {/* Logout Button */}
      <div className="mt-5">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 mb-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
