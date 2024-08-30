import React from "react";
import {
  FeaturedListingsComponent,
  FooterComponent,
  HeroComponent,
} from "../components";

const HomePage = () => {
  return (
    <div>
      <HeroComponent />
      <FeaturedListingsComponent />
      <FooterComponent />
    </div>
  );
};

export default HomePage;
