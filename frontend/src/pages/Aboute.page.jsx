import React from "react";
import { Button } from "@nextui-org/react"; // Import only the Button component

const AboutPage = () => {
  return (
    <div className="min-h-screen  text-gray-800 dark:bg-black dark:text-gray-100 p-4 md:p-8">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">About Us</h1>
        <p className="text-lg md:text-xl mt-4">
          Learn more about our company and values.
        </p>
      </header>

      {/* Main Content */}
      <main>
        {/* Company Overview */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Company Overview
          </h2>
          <p className="text-sm md:text-base leading-relaxed">
            We are a leading real estate company committed to providing
            top-notch services in buying, selling, and renting properties. With
            a dedicated team and years of experience, we strive to make your
            property transactions smooth and efficient.
          </p>
        </section>

        {/* Mission and Values */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Mission & Values
          </h2>
          <ul className="list-disc ml-5 text-sm md:text-base leading-relaxed">
            <li>
              <strong>Integrity:</strong> We operate with the highest standards
              of honesty and transparency.
            </li>
            <li>
              <strong>Customer-Centric:</strong> Our clients' needs are at the
              forefront of everything we do.
            </li>
            <li>
              <strong>Excellence:</strong> We are committed to delivering
              superior results and exceptional service.
            </li>
          </ul>
        </section>

        {/* Call to Action using NextUI Button */}
        <section className="text-center">
          <Button auto color="primary" className="my-4 text-sm md:text-base">
            Contact Us
          </Button>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="mt-8 text-center">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()} Real Estate Co. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;
