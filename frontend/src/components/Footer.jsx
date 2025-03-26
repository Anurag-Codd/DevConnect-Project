import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white">
      <div className="container mx-auto py-4 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">DevConnect</h1>
            <p className="ml-4">Connect with fellow developers</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0 gap-2 text-white">
            <p className="mr-4">
              Made with ❤️ by Anurag
            </p>
            <a href="" className="text-white">
              GitHub
            </a>
            |
            <a href="" className="text-white">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
