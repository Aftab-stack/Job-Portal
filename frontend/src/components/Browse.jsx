import React, { useEffect } from "react";
import Navbar from "./Shared/Navbar.jsx";
import Job from "./Job.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "./redux/jobSlice.js";
import useGetAllJobs from "../hooks/useGetAllJobs.jsx";

const Browse = ({ job }) => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Explore opportunities
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Search Results{" "}
            <span className="text-blue-600">({allJobs.length})</span>
          </h1>
        </div>
        {allJobs.length === 0 ? (
          <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
            <span className="text-sm font-medium text-slate-500">
              No jobs found
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {allJobs.map((job) => {
              return <Job key={job._id} job={job} />;
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Browse;
