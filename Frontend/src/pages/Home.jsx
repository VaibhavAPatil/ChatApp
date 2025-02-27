import React from "react";
import { Link } from "react-router-dom";
import OurTeam from "../components/OurTeam";
import HeroSection from "../components/HeroSection";
import Feature from "../components/Feature";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <HeroSection />
      <Feature />
      <OurTeam />
      <Footer />
    </>
  );
}

export default Home;
