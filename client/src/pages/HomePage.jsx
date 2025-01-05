import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("all"); // "all" or "friends"

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Unauthorized access! Please log in.");
        setLoading(false);
        return;
      }

      try {
        const usersResponse = await axios.get("http://localhost:8080/api/users/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersResponse.data);
        setFilteredUsers(usersResponse.data);

        const friendsResponse = await axios.get("http://localhost:8080/api/users/friends", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFriends(friendsResponse.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered =
      view === "all"
        ? users.filter((user) => user.username.toLowerCase().includes(query))
        : friends.filter((friend) => friend.username.toLowerCase().includes(query));

    setFilteredUsers(filtered);
  };

  const toggleView = (view) => {
    setView(view);
    setSearchQuery(""); // Reset search query
    setFilteredUsers(view === "all" ? users : friends);
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
            <li key={user._id} className="border-b py-2">
              {user.username}
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No {view} found</li>
        )}
      </ul>
    </div>
  );
};

export default HomePage;
