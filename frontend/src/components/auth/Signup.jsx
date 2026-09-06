import React, { useEffect, useState } from "react";
import axios from "axios";
import { Label } from "../ui/label.jsx";
import { RadioGroup } from "../ui/radio-group.jsx";
import Navbar from "../Shared/Navbar";
import { Button } from "../ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";

import { USER_API_END_POINT } from "../../utils/constant.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store.js";
import { setLoading } from "../redux/authSlice.js";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        timeout: 10000,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-5xl items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold text-slate-900">Sign Up</h1>
              <p className="text-sm text-slate-500">
                Create your account to get started.
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Full Name</Label>
              <input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="Mohd Aftab"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-red-400 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Email</Label>
              <input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="aftab@gmail.com"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-red-400 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Phone Number</Label>
              <input
                type="text"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="Enter phone number"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-red-400 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Password</Label>
              <input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Password"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-red-400 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Select Role</Label>
              <RadioGroup className="flex flex-col gap-2 sm:flex-row">
                <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role == "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  Student
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role == "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  Recruiter
                </label>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-700">Profile</Label>
              <input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="w-full cursor-pointer rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-600"
              />
            </div>

            {loading ? (
              <Button className="w-full">
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                wait{" "}
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Signup
              </Button>
            )}

            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-red-500 hover:text-red-600"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
