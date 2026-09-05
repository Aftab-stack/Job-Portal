import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { setallJobs } from "../components/redux/jobSlice";
import axios from "axios";
import { setSingleCompany } from "../components/redux/companySlice";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
