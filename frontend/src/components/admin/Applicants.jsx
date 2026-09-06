import React, { useEffect } from "react";
import Navbar from "../Shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true },
        );
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Recruiter workspace
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Applicants
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Review candidates and manage application status.
            </p>
          </div>
          <div className="w-fit rounded-xl border border-blue-100 bg-blue-50 px-5 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Total applicants
            </p>
            <p className="mt-1 text-2xl font-bold text-blue-700">
              {applicants?.applications?.length ?? 0}
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm sm:p-4">
          <ApplicantsTable />
        </div>
      </main>
    </div>
  );
};

export default Applicants;
