import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Unauthorized access! Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/users/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <ClipLoader color="#3b82f6" size={50} /> {/* Blue Spinner */}
          <p className="text-gray-500 mt-4">Fetching users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Registered Users</h1>
      <ul className="bg-white shadow-md rounded px-8 py-6 w-96">
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id} className="border-b py-2">
              {user.username}
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No users found</li>
        )}
      </ul>
    </div>
  );
};

export default HomePage;
