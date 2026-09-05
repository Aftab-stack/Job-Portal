import React, { useState } from "react";
import Navbar from "./Shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import store from "./redux/store";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";

// const skills = ["html", "css", "Javascript", "Reactjs"];
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen]= useState(false);
  const {user}= useSelector(store=>store.auth);

  return (
    <div>
      <Navbar />
      <div>
        <div>
          <div>
            <Avatar>
              <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIYpWWu9kztFkvlPvzgCB1P5JZ7NB872U6DvTj8Oo21Q&s=10" />
            </Avatar>
            <div>
              <h1>{user?.fullname}</h1>
              <p>
              {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={()=>setOpen(true)} >
            {" "}
            <Pen />{" "}
          </Button>
        </div>
        <div>
          <div>
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div>
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div>
          <h1>Skills</h1>
          <div>
            {user?.profile?.skills.length != 0 ? (
              user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div>
          <label>Resume </label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
            >{user?.profile?.resumeOriginalName}</a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div>
        <h1>Applied Jobs</h1>
        <AppliedJobTable/>
      </div>
      <UpdateProfile open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;
