import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";

import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../utils/constant";
import { setSingleJob } from "./redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import store from "./redux/store";

const JobDescription = () => {
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant == user?._id,
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const params = useParams();
  const jobId = params.id;

  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant == user?._id,
            ),
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <div>
        <div>
          <h1>{singleJob?.title}</h1>
          <div>
            <Badge>{singleJob?.position} Positions</Badge>
            <Badge>{singleJob?.jobType}</Badge>
            <Badge>{singleJob?.salary}LPA</Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
        >
          {" "}
          {isApplied ? "Already Applied" : "Apply Now"}{" "}
        </Button>
      </div>
      <h1>Job Description</h1>
      <hr />
      <div>
        <h1>
          Role : <span>{singleJob?.title}</span>
        </h1>
        <h1>
          Location : <span>{singleJob?.location}</span>
        </h1>
        <h1>
          Description : <span>{singleJob?.description}</span>
        </h1>
        <h1>
          Experience : <span>{singleJob?.experience} years</span>
        </h1>
        <h1>
          Salary : <span>{singleJob?.salary}LPA</span>
        </h1>
        <h1>
          Total Applicants : <span>{singleJob?.applications?.length}</span>
        </h1>
        <h1>
          Posted Date : <span>{singleJob?.createdAt?.split("T")[0]}</span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
