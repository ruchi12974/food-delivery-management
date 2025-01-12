import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function Register() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
        <form className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded-lg"
              placeholder="Create a password"
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full">
            Register
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default Register;