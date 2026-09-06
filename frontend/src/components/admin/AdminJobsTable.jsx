import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
// import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
// import store from "../redux/store";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  // const {allAdminJobs}= useSelector((store)=>store.job);

  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = (allAdminJobs || []).filter((job) => {
      if (!searchJobByText) {
        return true;
      }

      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-200">
      <Table className="min-w-160 bg-white">
        <TableCaption className="px-4 py-3 text-left text-sm text-slate-500">
          A list of your recent posted jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Company Name
            </TableHead>
            <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Role
            </TableHead>
            <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Date
            </TableHead>
            <TableHead className="w-20 px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow key={job._id}>
              <TableCell className="max-w-56 truncate px-4 py-4 text-sm font-medium text-slate-900">
                {job.company?.name}
              </TableCell>
              <TableCell className="max-w-64 truncate px-4 py-4 text-sm text-slate-600">
                {job.title}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">
                {job.createdAt?.split("T")[0]}
              </TableCell>
              <TableCell className="px-4 py-4 text-right">
                <Popover>
                  <PopoverTrigger className="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-700">
                    <MoreHorizontal className="size-4" />
                  </PopoverTrigger>
                  <PopoverContent className="w-40 rounded-xl border-slate-200 p-1 shadow-lg">
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}`)}
                      className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Edit2 className="size-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Eye className="size-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
