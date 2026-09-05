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
    <div>
      <Navbar />
      <div>
        <h1>Search Results ({allJobs.length}) </h1>
        <div className="grid grid-cols-3 gap-4">
          {allJobs.map((job) => {
            return <Job key={job._id} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
