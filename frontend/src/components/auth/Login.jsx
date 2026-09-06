import React, { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant.js";
import { Label } from "../ui/label.jsx";
import { RadioGroup } from "../ui/radio-group.jsx";
import Navbar from "../Shared/Navbar";
import { Button } from "../ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice.js";
import store from "../redux/store.js";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        timeout: 10000,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
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

      <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-5xl items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="min-w-0 w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Login
              </h1>
              <p className="text-sm text-slate-500">
                Sign in to continue your job search.
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Email
              </Label>
              <input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="aftab@gmail.com"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Password
              </Label>
              <input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Password"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Select Role
              </Label>
              <RadioGroup className="flex flex-col gap-2 sm:flex-row">
                <label className="flex flex-1 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 has-checked:border-blue-500 has-checked:bg-blue-50 has-checked:text-blue-700">
                  <input
                    type="radio"
                    name="role"
                    checked={input.role == "student"}
                    onChange={changeEventHandler}
                    value="student"
                    className="cursor-pointer accent-blue-600"
                  />
                  Student
                </label>
                <label className="flex flex-1 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 has-checked:border-blue-500 has-checked:bg-blue-50 has-checked:text-blue-700">
                  <input
                    type="radio"
                    name="role"
                    checked={input.role == "recruiter"}
                    onChange={changeEventHandler}
                    value="recruiter"
                    className="cursor-pointer accent-blue-600"
                  />
                  Recruiter
                </label>
              </RadioGroup>
            </div>

            {loading ? (
              <Button className="h-11 w-full rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700">
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                wait{" "}
              </Button>
            ) : (
              <Button
                type="submit"
                className="h-11 w-full rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700"
              >
                Login
              </Button>
            )}

            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
