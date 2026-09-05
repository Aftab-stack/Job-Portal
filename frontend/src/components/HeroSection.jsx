import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "./redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div>
      <div>
        <span>No. 1 Job Hunt Website</span>
        <h1>
          Search, Apply & <br />
          Get Your <span>Dream Jobs</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
          officiis cumque aut consequatur quisquam aliquid!
        </p>

        <div>
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={searchJobHandler}>
            <Search />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
