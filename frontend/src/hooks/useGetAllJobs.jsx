import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { JOB_API_END_POINT } from "../utils/constant";
import { setallJobs } from "../components/redux/jobSlice";
import axios from "axios";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const {searchedquery}= useSelector(store=>store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedquery}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setallJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, [searchedquery]);
};

export default useGetAllJobs;
