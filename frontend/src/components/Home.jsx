import React, { useEffect } from "react";
import Navbar from "./Shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import store from "./redux/store";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role == "recruiter") {
      navigate("/admin/companies");
    }
  });
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
            <HeroSection />
          </div>
        </section>
        <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <CategoryCarousel />
        </section>
        <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
          <LatestJobs />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
