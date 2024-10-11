import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const getUserData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res?.data?.success) {
        dispatch(setUser(res?.data?.user));
      }
    } catch (error) {
      console.log("ERROR WHILE GETTING USER DATA", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">User Dashboard</h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src="https://i.pinimg.com/550x/f1/79/3e/f1793e26bd3372a59d97ecfe18732749.jpg"
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover border-4 border-blue-500"
          />
        </div>

        {/* User Info */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-2">{user?.name}</h3>
          <p className="text-gray-600 mb-4">{user?.email}</p>

          {/* Edit Profile Button */}
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
