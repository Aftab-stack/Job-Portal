import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-200">
      <Table className="min-w-240 bg-white">
        <TableCaption className="px-4 py-3 text-left text-sm text-slate-500">
          A list of your recent applied user
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Full Name
            </TableHead>
            <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Email
            </TableHead>
            <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Contact
            </TableHead>
            <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Resume
            </TableHead>
            <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Date
            </TableHead>
            <TableHead className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item) => (
            <tr
              key={item._id}
              className="transition-colors hover:bg-blue-50/50"
            >
              <TableCell className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900">
                {item?.applicant?.fullname}
              </TableCell>
              <TableCell className="max-w-56 truncate px-4 py-4 text-sm text-slate-600">
                {item?.applicant?.email}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                {item?.applicant?.phoneNumber}
              </TableCell>
              <TableCell className="px-4 py-4">
                {item?.applicant?.profile?.resume ? (
                  <a
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    View Resume
                  </a>
                ) : (
                  <span className="text-sm text-slate-400">NA</span>
                )}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">
                {item?.applicant.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="px-4 py-4 text-right">
                <Popover>
                  <PopoverTrigger className="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-700">
                    <MoreHorizontal className="size-4" />
                  </PopoverTrigger>
                  <PopoverContent className="w-36 rounded-xl border-slate-200 p-1 shadow-lg">
                    {shortlistingStatus.map((status, index) => {
                      return (
                        <div
                          onClick={() => statusHandler(status, item?._id)}
                          key={index}
                          className="cursor-pointer rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                        >
                          <span>{status}</span>
                        </div>
                      );
                    })}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
