// src/pages/About.jsx
import React from "react";
import teamImage from "../assets/team.jpg"; // Replace with your team image

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">

        {/* Header Section */}
        <header className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gradient-to-r from-blue-600 to-blue-400 mb-6 tracking-tight">
            About MyBlog
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
            We deliver professional, insightful, and high-quality content that empowers our readers to learn, grow, and stay informed.
          </p>
        </header>

        {/* Mission & Vision Section */}
        <section className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              At <span className="font-semibold">MyBlog</span>, our mission is to provide insightful articles, tutorials, and news that make a real impact. We focus on technology, design, development, and personal growth.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We create content that is practical, helping readers implement knowledge in their personal and professional lives.
            </p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4">Our Vision</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We envision a world where knowledge is accessible, actionable, and engaging. <span className="font-semibold">MyBlog</span> strives to be the go-to platform for reliable insights.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our vision is to grow our community, inspire creativity, and empower our audience with content that transforms ideas into action.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="relative bg-blue-50 py-16 px-8 rounded-3xl shadow-lg overflow-hidden">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
          <div className="relative max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-600">Why Choose Us</h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              <span className="font-semibold">MyBlog</span> stands out for its professional approach, high-quality content, and commitment to helping our readers grow. Beginners and experts alike will find valuable resources here.
            </p>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Every topic is carefully researched, ensuring accuracy, clarity, and an engaging format. Learning becomes enjoyable and effective.
            </p>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Our experienced team is dedicated to delivering value with every article, tutorial, and guide.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="flex flex-col md:flex-row items-center gap-12 bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="md:w-1/2">
            <img
              src={teamImage}
              alt="Our Team"
              className="w-full rounded-2xl shadow-lg object-cover"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">Meet Our Team</h2>
            <p className="text-gray-700 leading-relaxed">
              Our team is composed of passionate professionals with expertise in technology, design, content creation, and education. Each member brings a unique perspective and skill set to ensure the best content possible.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Collaboration, creativity, and dedication drive our work. We continuously strive to improve, learn, and provide content that matters.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Together, we build a community of learners, creators, and innovators leveraging knowledge for personal and professional growth.
            </p>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-600">Join Us on Our Journey</h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            Thank you for visiting <span className="font-semibold">MyBlog</span>. We hope our content inspires, informs, and empowers you.
          </p>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            Stay connected, explore our articles, and grow with us as we continue to deliver quality content for years to come.
          </p>
          <button className="mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
            Explore Our Blog
          </button>
        </section>

      </div>
    </div>
  );
};

export default About;
