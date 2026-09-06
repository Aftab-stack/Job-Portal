import React, { useEffect, useState } from "react";
import Navbar from "./Shared/Navbar";
import FilterCards from "./FilterCards";
import Job from "./Job";
import { useSelector } from "react-redux";
import store from "./redux/store";
import { motion } from "framer-motion";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const { allJobs, searchedquery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedquery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedquery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedquery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedquery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedquery]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <FilterCards />
          </div>

          {filterJobs.length <= 0 ? (
            <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
              <span className="text-sm font-medium text-slate-500">
                Job not found
              </span>
            </div>
          ) : (
            <div className="min-w-0">
              <div className="grid gap-5 md:grid-cols-2">
                {filterJobs.map((job) => (
                  <motion.div
                    className="h-full"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Jobs;
