import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  // const jobId= 'gwhdghdhchrge';
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="flex h-full flex-col gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {daysAgoFunction(job?.createdAt) == 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}{" "}
        </p>
        <Button
          variant="outline"
          size="icon"
          className="rounded-lg border-slate-200 text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
        >
          <Bookmark className="size-4" />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="size-12 shrink-0 rounded-xl border-slate-200 bg-slate-50 p-1.5 hover:border-blue-200 hover:bg-blue-50"
        >
          <Avatar className="size-full">
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold text-slate-900">
            {job?.company?.name}
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">India</p>
        </div>
      </div>
      <div className="min-w-0 space-y-2">
        <h1 className="line-clamp-2 text-lg font-semibold leading-snug text-slate-900 sm:text-xl">
          {job?.title}
        </h1>
        <p className="line-clamp-3 text-sm leading-6 text-slate-600">
          {job?.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge className="rounded-full border-blue-100 bg-blue-50 text-blue-700">
          {job?.position} Positions
        </Badge>
        <Badge className="rounded-full border-slate-200 bg-slate-50 text-slate-600">
          {job?.jobType}
        </Badge>
        <Badge className="rounded-full border-green-100 bg-green-50 text-green-700">
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="mt-auto flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full rounded-lg border-slate-200 text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:w-auto"
        >
          {" "}
          Details
        </Button>
        
        {/* <Button className="w-full rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 sm:flex-1">
          Save For Later
        </Button> */}

      </div>
    </div>
  );
};

export default Job;
