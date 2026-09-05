import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/description/${job._id}`)}>
      <div>
        <h1>{job?.company?.name}</h1>
        <p>India</p>
      </div>
      <div>
        <h1>{job?.title}</h1>
        <p>{job?.description}</p>
      </div>
      <div>
        <Badge variant="ghost">{job?.position} Positions</Badge>
        <Badge variant="ghost">{job?.jobType}</Badge>
        <Badge variant="ghost">{job?.salary}LPA</Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
