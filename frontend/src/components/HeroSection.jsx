import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "./redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="mx-auto flex w-full max-w-3xl justify-center text-center">
      <div className="w-full space-y-6">
        <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Search, Apply & <br />
          Get Your <span className="text-blue-600">Dream Jobs</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          Find the right opportunity, connect with leading companies, and take
          the next step in your career.
        </p>

        <div className="mx-auto flex w-full max-w-2xl flex-col gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-transparent bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
          <Button
            onClick={searchJobHandler}
            className="h-11 w-full rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 sm:w-auto sm:px-5"
          >
            <Search className="size-4" />
            <span className="sm:hidden">Search Jobs</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
