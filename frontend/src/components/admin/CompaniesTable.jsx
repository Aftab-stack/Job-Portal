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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company,
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);
  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-160">
        <TableCaption className="px-4 py-3 text-left text-sm text-slate-500">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="w-20 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Logo
            </TableHead>
            <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Name
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
          {filterCompany?.map((company) => (
            <TableRow className="transition-colors hover:bg-blue-50/50">
              <TableCell className="px-4 py-3">
                <Avatar className="size-10 rounded-lg">
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell className="max-w-64 truncate px-4 py-3 text-sm font-medium text-slate-900">
                {company.name}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-3 text-sm text-slate-500">
                {company.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="px-4 py-3 text-right">
                <Popover>
                  <PopoverTrigger className="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-700">
                    <MoreHorizontal className="size-4" />
                  </PopoverTrigger>
                  <PopoverContent className="w-36 rounded-xl border-slate-200 p-1 shadow-lg">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Edit2 className="size-4" />
                      <span>Edit company</span>
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

export default CompaniesTable;
