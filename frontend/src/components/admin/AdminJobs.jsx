import React, { useEffect, useState } from "react";
import Navbar from "../Shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import CompaniesTable from './CompaniesTable'
import { useNavigate } from "react-router-dom";
// import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useDispatch } from "react-redux";
// import { setSearchCompanyByText } from "../redux/companySlice";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "../redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div>
        <div>
          <Input
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>
            New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
