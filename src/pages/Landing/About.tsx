// src/pages/Landing/About.tsx
import React from "react";

const About: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">About ParcelGo</h2>
        <p className="text-gray-600 leading-relaxed mb-8">
          ParcelGo is a smart courier management system built to simplify sending 
          and receiving parcels. Whether you are a sender, a receiver, or an admin, 
          ParcelGo helps you track parcels, manage deliveries, and stay updated in real time.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-semibold mb-3">For Senders</h3>
            <p className="text-gray-600">
              Easily create and manage your parcels, check delivery status, and keep track of costs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-semibold mb-3">For Receivers</h3>
            <p className="text-gray-600">
              Stay informed with live updates on your parcels and enjoy a smooth delivery experience.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-semibold mb-3">For Admins</h3>
            <p className="text-gray-600">
              Manage all parcels, monitor delivery timelines, and keep the system running seamlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
