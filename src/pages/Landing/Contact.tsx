// src/pages/Landing/Contact.tsx
import React from "react";

const Contact: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Have questions or feedback? We'd love to hear from you. Fill out the form below and we’ll get back to you as soon as possible.
        </p>

        <form className="space-y-6 bg-gray-50 p-8 rounded-xl shadow-sm border">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="mt-2 block w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Write your message..."
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
