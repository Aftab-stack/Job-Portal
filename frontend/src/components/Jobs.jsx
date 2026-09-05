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
    <div>
      <Navbar />
      <div>
        <div>
          <FilterCards />
        </div>

        {filterJobs.length <= 0 ? (
          <span>Job not found</span>
        ) : (
          <div>
            <div>
              {filterJobs.map((job) => (
                <motion.div
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
    </div>
  );
};

export default Jobs;
