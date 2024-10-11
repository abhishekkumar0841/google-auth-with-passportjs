import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn, setToken, setUser } from "../redux/slices/authSlice";

const Login = () => {
  const server_url = import.meta.env.VITE_SERVER_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Test@123");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${server_url}/user/login`, {
        email,
        password,
      });
      if (res?.data?.success) {
        dispatch(setToken(res?.data?.token))
        dispatch(setUser(res?.data?.user))
        dispatch(setIsLoggedIn())
        toast.success("Logged in success");
        navigate("/");
      }
    } catch (error) {
      console.error("ERROR WHILE LOGIN", error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <button className="w-full bg-red-500 text-white py-2 mt-4 rounded hover:bg-red-600">
          <a href={`${server_url}/auth/google`}>Login with Google</a>
        </button>
      </div>
    </div>
  );
};

export default Login;
