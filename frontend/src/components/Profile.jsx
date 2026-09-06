import React, { useState } from "react";
import Navbar from "./Shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import store from "./redux/store";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";

// const skills = ["html", "css", "Javascript", "Reactjs"];
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <Avatar className="size-20 shrink-0 ring-4 ring-blue-50 sm:size-24">
                <AvatarImage src={user?.profile?.profilePhoto} />
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Candidate profile
                </p>
                <h1 className="mt-1 truncate text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {user?.fullname}
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  {user?.profile?.bio}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setOpen(true)}
              className="w-full rounded-lg border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 md:w-auto"
            >
              <Pen className="size-4" />
              Edit Profile
            </Button>
          </div>

          <div className="mt-6 grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-2">
            <div className="flex min-w-0 items-center gap-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
              <Mail className="size-4 shrink-0 text-blue-600" />
              <span className="truncate">{user?.email}</span>
            </div>
            <div className="flex min-w-0 items-center gap-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
              <Contact className="size-4 shrink-0 text-blue-600" />
              <span className="truncate">{user?.phoneNumber}</span>
            </div>
          </div>

          <div className="mt-6 grid gap-6 border-t border-slate-100 pt-6 md:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Skills</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {user?.profile?.skills.length != 0 ? (
                  user?.profile?.skills.map((item, index) => (
                    <Badge
                      className="rounded-full border-blue-100 bg-blue-50 text-blue-700"
                      key={index}
                    >
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">NA</span>
                )}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-900">
                Resume
              </label>
              {isResume ? (
                <a
                  target="blank"
                  href={user?.profile?.resume}
                  className="mt-3 block truncate text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  {user?.profile?.resumeOriginalName}
                </a>
              ) : (
                <span className="mt-3 block text-sm text-slate-500">NA</span>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Applied Jobs</h2>
          <p className="mt-1 text-sm text-slate-500">
            Track the opportunities you have applied for.
          </p>
          <div className="mt-5 overflow-x-auto">
            <AppliedJobTable />
          </div>
        </section>
      </main>
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
