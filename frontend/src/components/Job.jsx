import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  
  const navigate = useNavigate();
  // const jobId= 'gwhdghdhchrge';
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div>
      <div>
        <p>
          {daysAgoFunction(job?.createdAt) == 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}{" "}
        </p>
        <Button variant="outline">
          <Bookmark />
        </Button>
      </div>

      <div>
        <Button>
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1>{job?.company?.name}</h1>
          <p>India</p>
        </div>
      </div>
      <div>
        <h1>{job?.title}</h1>
        <p>{job?.description}</p>
      </div>
      <div>
        <Badge>{job?.position} Positions</Badge>
        <Badge>{job?.jobType}</Badge>
        <Badge>{job?.salary}LPA</Badge>
      </div>
      <div>
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          {" "}
          Details
        </Button>
        <Button>Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
