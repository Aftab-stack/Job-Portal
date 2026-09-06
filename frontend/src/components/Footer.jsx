import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-3">
        <h2 className="text-sm font-semibold tracking-tight text-slate-800">
          Job<span className="text-blue-600">Portal</span>
        </h2>
        <span className="hidden text-slate-300 sm:inline" aria-hidden="true">
          •
        </span>
        <span className="text-xs text-slate-500 sm:text-sm">© 2026</span>
        <span className="text-xs text-slate-500 sm:text-sm">
          All rights reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
