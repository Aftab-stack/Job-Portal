import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "./redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Mumbai", "Bangalore", "Pune", "Hyderabad"],
  },
  {
    filterType: "Industry",
    array: [
      "FullStack Developer",
      "Frontend",
      "Backend",
      "UI & UX Designer",
      "Power BI",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k-1lakh", "1lakh-5lakhs"],
  },
];

const FilterCards = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-base font-semibold text-slate-900">Filter Jobs</h1>
        <p className="mt-1 text-sm text-slate-500">Refine your search</p>
      </div>
      <hr className="border-slate-200" />
      <RadioGroup
        className="space-y-5"
        value={selectedValue}
        onValueChange={changeHandler}
      >
        {filterData.map((data, index) => (
          <div className="space-y-3">
            <h1 className="text-sm font-semibold text-slate-700">
              {data.filterType}
            </h1>
            {data.array.map((item, idx) => {
              const itemId = `r${index}-${idx}`;
              return (
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    className="border-slate-300 text-blue-600"
                    value={item}
                    id={itemId}
                  />
                  <Label
                    className="cursor-pointer text-sm font-normal text-slate-600"
                    htmlFor={itemId}
                  >
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCards;
