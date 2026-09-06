import React, { useEffect, useState } from "react";
import Navbar from "../Shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        const job = res.data.job;
        setInput({
          title: job.title || "",
          description: job.description || "",
          requirements: job.requirements?.join(",") || "",
          salary: job.salary || "",
          location: job.location || "",
          jobType: job.jobType || "",
          experience: job.experienceLevel || "",
          position: job.position || "",
          companyId: job.company?._id || job.company || "",
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Unable to load job");
      }
    };

    fetchJob();
  }, [id]);

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() == value,
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios({
        method: isEditMode ? "put" : "post",
        url: isEditMode
          ? `${JOB_API_END_POINT}/update/${id}`
          : `${JOB_API_END_POINT}/post`,
        data: input,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Recruiter workspace
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {isEditMode ? "Update Job" : "Create Job"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Add the details candidates need to understand this opportunity.
          </p>
        </div>
        <form
          onSubmit={submitHandler}
          className="space-y-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label className="text-sm font-medium text-slate-700">
                Title
              </Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeHandler}
                className="h-11 rounded-lg border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="text-sm font-medium text-slate-700">
                Description
              </Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeHandler}
                className="h-11 rounded-lg border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="text-sm font-medium text-slate-700">
                Requirements
              </Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeHandler}
                className="h-11 rounded-lg border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Salary
              </Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeHandler}
                className="h-11 rounded-lg border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Location
              </Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeHandler}
                className="h-11 rounded-lg border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Job Type
              </Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeHandler}
                className="h-11 rounded-lg border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Experience Level
              </Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeHandler}
                className="h-11 rounded-lg border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                No of Position
              </Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeHandler}
                className="h-11 rounded-lg border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
          {companies.length > 0 && (
            <Select onValueChange={selectChangeHandler}>
              <SelectTrigger className="h-11 rounded-lg border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <SelectValue placeholder={"Select a Company"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {companies.map((company) => {
                    return (
                      <SelectItem
                        value={company?.name?.toLowerCase()}
                        key={company._id}
                      >
                        {company.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          {loading ? (
            <Button className="h-11 w-full rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Post New
              job{" "}
            </Button>
          ) : (
            <Button
              type="submit"
              className="h-11 w-full rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700"
            >
              {isEditMode ? "Update" : "Post Job"}
            </Button>
          )}
          {companies.length == 0 && (
            <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Please register a company first, before posting a job.
            </p>
          )}
        </form>
      </main>
    </div>
  );
};

export default PostJob;
