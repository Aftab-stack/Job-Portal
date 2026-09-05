import React, { useState} from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "../utils/constant.js";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { setUser } from "./redux/authSlice";
import { toast } from "sonner";

const UpdateProfile = ({ open, setOpen }) => {
  const [loading, setLoading]= useState(false);
  const {user}= useSelector(store=>store.auth);

  const [input, setInput]=useState({
    fullname:user?.fullname,
    email:user?.email,
    phoneNumber:user?.phoneNumber,
    bio:user?.profile?.bio,
    skills:user?.profile?.skills?.map(skill=>skill),
    file:user?.profile?.resume
  });

  const dispatch= useDispatch();

  const changeEventHandler= (e)=>{
    setInput({...input,[e.target.name]:e.target.value});
  }

  const fileChangeHandler=(e)=>{
    const file=e.target.files?.[0];
    setInput({...input, file})
  }

  const submitHandler= async (e)=>{
    e.preventDefault();
    setLoading(true);
    const formData=new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if(input.file){
      formData.append("file", input.file);
    }
    try {
      
      const res=await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers:{
          'Content-Type': 'multipart/form-data'
        },
        withCredentials:true
      });
      if(res.data.success){
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
  console.log(error);

  toast.error(
    error.response?.data?.message || error.message
  );
} finally{
  setLoading(false);
}
    setOpen(false);
    console.log(input);
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="fullname" value={input.fullname || ""} onChange={changeEventHandler} className="col-span-3" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email"  value={input.email || ""} name="email" onChange={changeEventHandler} className="col-span-3" />
              </div>
              <div>
                <Label htmlFor="number">Number</Label>
                <Input id="number"  value={input.phoneNumber || ""} onChange={changeEventHandler} name="phoneNumber" className="col-span-3" />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio"  value={input.bio || ""} onChange={changeEventHandler} name="bio" className="col-span-3" />
              </div>
              <div>
                <Label htmlFor="skills">Skills</Label>
                <Input id="skills"  value={input.skills || ""} onChange={changeEventHandler} name="skills" className="col-span-3" />
              </div>
              <div>
                <Label htmlFor="file">Resume</Label>
                <Input id="file" name="file" type="file" accept="application/pdf" onChange={fileChangeHandler} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
              <Button className="w-full" type ="submit" disabled={loading}>
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                wait{" "}
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Update
              </Button>
            )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfile;
