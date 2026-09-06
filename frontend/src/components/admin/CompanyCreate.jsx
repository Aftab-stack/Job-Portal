import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();
  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto flex w-full max-w-3xl justify-center px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 border-b border-slate-100 pb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Recruiter workspace
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Your Company Name
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea
              dolores dolore sequi ullam nisi?
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">
              Company Name
            </Label>
            <Input
              type="text"
              placeholder="JobHunt Microsoft etc."
              onChange={(e) => setCompanyName(e.target.value)}
              className="h-11 rounded-lg border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="w-full rounded-lg border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={registerNewCompany}
              className="w-full rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 sm:w-auto"
            >
              Continue
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyCreate;
