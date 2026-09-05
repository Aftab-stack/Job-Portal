import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "./redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch= useDispatch();
  const navigate= useNavigate();

  const searchJobHandler= (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={cat}>
              <Button variant="outline" onClick={() => searchJobHandler(cat)}>
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
