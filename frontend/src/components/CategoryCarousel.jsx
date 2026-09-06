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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="relative w-full">
      <Carousel className="mx-auto w-full max-w-5xl px-10 sm:px-12">
        <CarouselContent className="-ml-3">
          {category.map((cat, index) => (
            <CarouselItem
              key={cat}
              className="basis-full pl-3 sm:basis-1/2 lg:basis-1/3"
            >
              <Button
                variant="outline"
                onClick={() => searchJobHandler(cat)}
                className="h-12 w-full rounded-lg border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700" />
        <CarouselNext className="right-0 border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
