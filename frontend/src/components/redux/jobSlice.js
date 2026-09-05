import {createSlice} from "@reduxjs/toolkit"

const jobSlice= createSlice({
  name:'job',
  initialState:{
    allJobs:[],
    allAdminJobs:[],
    singleJob:null,
    searchJobByText:"",
    allAppliedJobs:[],
    searchedquery:"",

  },
  reducers:{
    setallJobs:(state, action)=>{
      state.allJobs=action.payload;
      
    },
    setSingleJob:(state, action)=>{
      state.singleJob= action.payload;
    },
    setAllAdminJobs:(state, action)=>{
      state.allAdminJobs= action.payload;
    },
    setSearchJobByText:(state,action)=>{
      state.searchJobByText=action.payload
    },
    setAllAppliedJobs:(state, action)=>{
      state.allAppliedJobs= action.payload
    },
    setSearchedQuery:(state, action)=>{
      state.searchedquery= action.payload
    }
    
  }
});


export const {setallJobs, setSingleJob, setAllAdminJobs, setSearchJobByText, setAllAppliedJobs, setSearchedQuery}= jobSlice.actions;
export default jobSlice.reducer;
