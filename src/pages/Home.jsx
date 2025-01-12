import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function Home() {
  return (
    <div>
      <Navbar/>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-6">
          Welcome to Hospital Food Management
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Manage patient diets, pantry tasks, and delivery efficiently.
        </p>
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600">
            Get Started
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;