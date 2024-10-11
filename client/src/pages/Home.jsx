import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bearerToken = params?.get("token");

  if (bearerToken) {
    const token = bearerToken?.split("Bearer ")[1];
    dispatch(setToken(token));
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <header className="bg-blue-500 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Welcome to Our Website</h1>
        <p className="text-lg mt-4">
          Explore the features and functionality we offer to enhance your
          experience.
        </p>
        <button className="mt-6 bg-white text-blue-500 px-6 py-2 rounded-full shadow-md hover:bg-blue-100">
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Feature One</h3>
              <p className="text-gray-700">
                Discover the first amazing feature that makes our platform
                unique.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Feature Two</h3>
              <p className="text-gray-700">
                The second feature is designed to improve your productivity and
                efficiency.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Feature Three</h3>
              <p className="text-gray-700">
                Explore the third feature that offers exceptional support and
                integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-500 text-white py-12 text-center">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="mt-4">
          Join us today and start enjoying all the benefits!
        </p>
        <button className="mt-6 bg-white text-blue-500 px-8 py-2 rounded-full shadow-md hover:bg-blue-100">
          Sign Up Now
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>© 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
