import React, { useEffect, useState } from "react";
import Navbar from "../Shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Recruiter workspace
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Companies
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage the companies connected to your job listings.
            </p>
          </div>
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="w-full rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 sm:w-auto"
          >
            New Company
          </Button>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <Input
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
            className="h-11 rounded-lg border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-2 shadow-sm sm:p-4">
          <CompaniesTable />
        </div>
      </main>
    </div>
  );
};

export default Companies;
