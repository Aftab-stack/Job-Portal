import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const companyArray = [];

const PostJob = () => {
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
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
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
    <div>
      <Navbar />
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={changeHandler}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeHandler}
            />
          </div>
          <div>
            <Label>Requirements</Label>
            <Input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeHandler}
            />
          </div>
          <div>
            <Label>Salary</Label>
            <Input
              type="text"
              name="salary"
              value={input.salary}
              onChange={changeHandler}
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeHandler}
            />
          </div>
          <div>
            <Label>Job Type</Label>
            <Input
              type="text"
              name="jobType"
              value={input.jobType}
              onChange={changeHandler}
            />
          </div>
          <div>
            <Label>Experience Level</Label>
            <Input
              type="text"
              name="experience"
              value={input.experience}
              onChange={changeHandler}
            />
          </div>
          <div>
            <Label>No of Position</Label>
            <Input
              type="number"
              name="position"
              value={input.position}
              onChange={changeHandler}
            />
          </div>
          {companies.length > 0 && (
            <Select onValueChange={selectChangeHandler}>
              <SelectTrigger>
                <SelectValue placeholder={"Select a Company"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {companies.map((company) => {
                    return (
                      <SelectItem value={company?.name?.toLowerCase()}   key={company._id}>
                        {company.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          {loading ? (
            <Button className="w-full">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Post New
              job{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Update
            </Button>
          )}
          {companies.length == 0 && (
            <p>Please register a company first, before posting a job.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
