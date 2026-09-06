import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-200">
      <Table className="min-w-160 bg-white">
        <TableCaption className="px-4 py-3 text-left text-sm text-slate-500">
          A list of your applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Date
            </TableHead>
            <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Job Role
            </TableHead>
            <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Company
            </TableHead>
            <TableHead className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <span>You have not applied to any jobs yet.</span>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow
                key={appliedJob._id}
                className="transition-colors hover:bg-blue-50/50"
              >
                <TableCell className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">
                  {appliedJob.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="max-w-56 truncate px-4 py-4 text-sm font-medium text-slate-900">
                  {appliedJob.job.title}
                </TableCell>
                <TableCell className="max-w-48 truncate px-4 py-4 text-sm text-slate-600">
                  {appliedJob.job.company.name}
                </TableCell>
                <TableCell className="whitespace-nowrap px-4 py-4 text-right">
                  <Badge className="rounded-full border-green-100 bg-green-50 text-green-700">
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
