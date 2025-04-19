import React from "react";

const AboutUsPage = () => {
  return (
    <div className="bg-gray-100">
      {/* Company Overview Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About Us</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are a team of dedicated professionals committed to providing high-quality construction services.
            Our mission is to deliver exceptional results for our clients through innovation, efficiency, and
            reliability. We have been in the industry for over a decade and have built a reputation for excellence.
          </p>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600">
              Our mission is to provide the highest quality construction services while maintaining our
              commitment to safety, sustainability, and customer satisfaction. We strive to exceed client expectations
              and build lasting relationships through trust and collaboration.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src="/img/night.jpg"  // Replace with the actual image source
              alt="Mission"
              className="w-full md:w-3/4 h-auto md:h-48 rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-10">
          <div className="flex justify-center md:justify-start">
            <img
              src="/img/nightwater.jpg"  // Replace with the actual image source
              alt="Vision"
              className="w-full md:w-3/4 h-auto md:h-48 rounded-lg shadow-lg object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Vision</h2>
            <p className="text-lg text-gray-600">
              Our vision is to become the most trusted and innovative construction company in the industry. We aim to
              lead with forward-thinking practices, delivering high-quality projects that create long-term value for our
              clients and communities.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-10">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src="/img/owner.png"
                alt="Team Member 1"
                className="w-32 h-32 mx-auto rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-4">John Doe</h3>
              <p className="text-gray-600 mt-2">CEO & Founder</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src="/img/seo.jpeg"
                alt="Team Member 2"
                className="w-32 h-32 mx-auto rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-4">Jane Smith</h3>
              <p className="text-gray-600 mt-2">Project Manager</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src="/img/leade.jpg"
                alt="Team Member 3"
                className="w-32 h-32 mx-auto rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-4">Alex Johnson</h3>
              <p className="text-gray-600 mt-2">Lead Engineer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Contact Us</h2>
          <p className="text-lg text-gray-600 mb-8">
            We would love to hear from you! Feel free to reach out to us for any questions or inquiries.
          </p>
          <div className="space-x-4">
            <a
              href="mailto:info@example.com"
              className="text-lg text-blue-600 hover:underline"
            >
              Email Us
            </a>
            <span className="text-lg text-gray-600">|</span>
            <a
              href="tel:+123456789"
              className="text-lg text-blue-600 hover:underline"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>&copy; 2025 Construction Services, All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUsPage;
