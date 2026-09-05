import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 text-center sm:flex-row sm:gap-2">
        <h2 className="text-sm font-semibold text-gray-700">
          Job<span className="text-red-500">Portal</span>
        </h2>
        <span className="text-sm text-gray-500">© 2026</span>
        <span className="text-sm text-gray-500">All rights reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
