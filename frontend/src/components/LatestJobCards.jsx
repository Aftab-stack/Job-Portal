import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="flex h-full min-w-0 cursor-pointer flex-col gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-6"
    >
      <div className="min-w-0">
        <h1 className="truncate text-sm font-semibold text-slate-900">
          {job?.company?.name}
        </h1>
        <p className="mt-1 text-sm text-slate-500">India</p>
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <h1 className="line-clamp-2 text-lg font-semibold leading-snug text-slate-900">
          {job?.title}
        </h1>
        <p className="line-clamp-3 text-sm leading-6 text-slate-600">
          {job?.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
        <Badge
          variant="ghost"
          className="rounded-full border-blue-100 bg-blue-50 text-blue-700"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          variant="ghost"
          className="rounded-full border-slate-200 bg-slate-50 text-slate-600"
        >
          {job?.jobType}
        </Badge>
        <Badge
          variant="ghost"
          className="rounded-full border-green-100 bg-green-50 text-green-700"
        >
          {job?.salary}LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
