import React from "react";
import NavBar from "../components/NavBar";

const AboutUs = () => {
  return (
    <div className="min-h-screen mt-8 flex flex-col">
      {/* Navbar */}
      <NavBar />

      {/* About Section */}
      <div className="flex-grow bg-gray-50 py-12 px-6 md:px-20 lg:px-40">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            About the Faculty Upscaling Platform
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            The Faculty Upscaling Platform is designed to help educators enhance
            their professional development and streamline self-appraisal
            processes. This platform provides faculty members with personalized
            learning paths, real-time tracking of their activities, and
            comprehensive performance evaluations. College administrators can
            also use the platform to review faculty progress and assist in
            upscaling opportunities.
          </p>

          <p className="text-lg text-gray-600 mb-6">
            Our goal is to enable faculty members to continually improve their
            skills and contribute to the academic success of their institutions.
            Through advanced tracking and reporting features, faculty members
            can stay up-to-date with their achievements, ongoing projects, and
            future career development opportunities.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-10">
            Key Features
          </h2>
          <ul className="list-disc list-inside text-gray-600 mb-8">
            <li>Personalized learning paths based on faculty goals</li>
            <li>Real-time activity tracking for self-appraisal</li>
            <li>Secure login and access management</li>
            <li>Comprehensive performance evaluations and reports</li>
            <li>Administrator dashboard for monitoring progress</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-10">
            Our Vision
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            We aim to create an inclusive and supportive environment where
            faculty members can continuously learn, grow, and achieve their
            career aspirations. By utilizing this platform, institutions can
            effectively manage faculty development while providing a transparent
            and efficient appraisal system.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-4 text-center text-white">
        <p>&copy; 2024 Faculty Upscaling Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
