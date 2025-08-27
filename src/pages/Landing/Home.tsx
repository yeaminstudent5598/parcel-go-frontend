// src/pages/Landing/Home.tsx
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          Fast & Reliable Parcel Delivery Service
        </h1>
        <p className="text-lg md:text-xl text-gray-100 mb-8">
          Send and receive parcels with ease. Track your packages in real-time and enjoy a seamless delivery experience.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
