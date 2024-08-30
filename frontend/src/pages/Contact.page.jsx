import React from "react";
import { Input, Button } from "@nextui-org/react"; // Import NextUI components

const ContactPage = () => {
  return (
    <div className="min-h-screen  text-gray-800 dark:bg-black dark:text-gray-100 p-4 md:p-8">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
        <p className="text-lg md:text-xl mt-4">
          We’d love to hear from you! Please fill out the form below.
        </p>
      </header>

      {/* Contact Form */}
      <main className="max-w-2xl mx-auto">
        <form
          onSubmit={(event) => event.preventDefault()}
          className="space-y-6"
        >
          {/* Name Input */}
          <div>
            <Input
              required
              fullWidth
              clearable
              label="Name"
              placeholder="Enter your name"
              className="text-sm md:text-base"
            />
          </div>

          {/* Email Input */}
          <div>
            <Input
              required
              fullWidth
              clearable
              label="Email"
              type="email"
              placeholder="Enter your email"
              className="text-sm md:text-base"
            />
          </div>

          {/* Message Input */}
          <div>
            <Input
              required
              fullWidth
              clearable
              label="Message"
              placeholder="Your message"
              multiline
              rows={4}
              className="text-sm md:text-base"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              auto
              color="primary"
              type="submit"
              className="text-sm md:text-base"
            >
              Send Message
            </Button>
          </div>
        </form>
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

export default ContactPage;
