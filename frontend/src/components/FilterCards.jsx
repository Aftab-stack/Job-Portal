import React, { useEffect, useState } from 'react'
import {RadioGroup, RadioGroupItem} from "./ui/radio-group";
import {Label} from "./ui/label"
import {useDispatch} from "react-redux";
import {setSearchedQuery} from './redux/jobSlice';

const filterData=[
  {
    filterType:"Location",
    array:["Delhi NCR", "Mumbai", "Bangalore", "Pune", "Hyderabad"]
  },
  {
    filterType:"Industry",
    array:["FullStack Developer", "Frontend", "Backend", "UI & UX Designer", "Power BI"]
  },
  {
    filterType:"Salary",
    array:["0-40k", "42k-1lakh", "1lakh-5lakhs"]
  },
]

const FilterCards = () => {
  const [selectedValue, setSelectedValue]= useState('');
  const dispatch= useDispatch();

  const changeHandler=(value)=>{
    setSelectedValue(value);
  }
  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue));
  },[selectedValue])
  return (
    <div>
      <h1>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          filterData.map((data, index)=>(
            <div>
              <h1>{data.filterType}</h1>
              {
                data.array.map((item, idx)=>{
                  const itemId= `r${index}-${idx}`;
                  return (
                    <div>
                      <RadioGroupItem value={item} id={itemId}/>
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCards
