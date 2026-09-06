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
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="flex flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0 space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium text-blue-600">
                Job opportunity
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {singleJob?.title}
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-full border-blue-100 bg-blue-50 text-blue-700">
                {singleJob?.position} Positions
              </Badge>
              <Badge className="rounded-full border-slate-200 bg-slate-50 text-slate-600">
                {singleJob?.jobType}
              </Badge>
              <Badge className="rounded-full border-green-100 bg-green-50 text-green-700">
                {singleJob?.salary}LPA
              </Badge>
            </div>
          </div>

          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className="w-full rounded-lg bg-blue-600 px-6 text-white shadow-sm hover:bg-blue-700 disabled:bg-green-600 sm:w-auto"
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-xl font-semibold text-slate-900">
              Job Description
            </h1>
            <hr className="my-5 border-slate-200" />
            <div className="space-y-5 text-sm leading-7 text-slate-600">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Role</h2>
                <p>{singleJob?.title}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Description
                </h2>
                <p>{singleJob?.description}</p>
              </div>
            </div>
          </section>

          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Job Overview
            </h2>
            <div className="mt-5 divide-y divide-slate-100">
              <p className="flex items-center justify-between gap-4 py-3 text-sm">
                <span className="text-slate-500">Location</span>
                <span className="text-right font-medium text-slate-900">
                  {singleJob?.location}
                </span>
              </p>
              <p className="flex items-center justify-between gap-4 py-3 text-sm">
                <span className="text-slate-500">Experience</span>
                <span className="text-right font-medium text-slate-900">
                  {singleJob?.experience} years
                </span>
              </p>
              <p className="flex items-center justify-between gap-4 py-3 text-sm">
                <span className="text-slate-500">Salary</span>
                <span className="text-right font-medium text-slate-900">
                  {singleJob?.salary}LPA
                </span>
              </p>
              <p className="flex items-center justify-between gap-4 py-3 text-sm">
                <span className="text-slate-500">Applicants</span>
                <span className="text-right font-medium text-slate-900">
                  {singleJob?.applications?.length}
                </span>
              </p>
              <p className="flex items-center justify-between gap-4 py-3 text-sm">
                <span className="text-slate-500">Posted</span>
                <span className="text-right font-medium text-slate-900">
                  {singleJob?.createdAt?.split("T")[0]}
                </span>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
