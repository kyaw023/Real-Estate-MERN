import { Button } from "@nextui-org/react";
import {
  Facebook,
  FacebookIcon,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import React from "react";

const FooterComponent = () => {
  return (
    <footer className=" dark:text-white text-slate-800 py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Real Estate Co.</h2>
          <p className="text-sm dark:text-slate-300 text-slate-500">
            Your trusted partner in buying, selling, and renting properties.
            Find your dream property with us!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-sm dark:text-slate-300 text-slate-500 hover:text-white"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm dark:text-slate-300 text-slate-500 hover:text-white"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm dark:text-slate-300 text-slate-500 hover:text-white"
              >
                Properties
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm dark:text-slate-300 text-slate-500 hover:text-white"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p className="text-sm dark:text-slate-300 text-slate-500">
            123 Main Street, City, Country
          </p>
          <p className="text-sm dark:text-slate-300 text-slate-500 mt-2">
            Email: info@realestateco.com
          </p>
          <p className="text-sm dark:text-slate-300 text-slate-500 mt-2">
            Phone: +123 456 7890
          </p>
        </div>

        {/* Social Media Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <Button
              isIconOnly
              color="warning"
              variant="faded"
              aria-label="Take a photo"
            >
              <Twitter size={20} />
            </Button>
            <Button
              isIconOnly
              color="warning"
              variant="faded"
              aria-label="Take a photo"
            >
              <Instagram size={20} />
            </Button>
            <Button
              isIconOnly
              color="warning"
              variant="faded"
              aria-label="Take a photo"
            >
              <FacebookIcon size={20} />
            </Button>
            <Button
              isIconOnly
              color="warning"
              variant="faded"
              aria-label="Take a photo"
            >
              <Linkedin size={20} />
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm dark:text-slate-300 text-slate-500">
        © {new Date().getFullYear()} Real Estate Co. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterComponent;
