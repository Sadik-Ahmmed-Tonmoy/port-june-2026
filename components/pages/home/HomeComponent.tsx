import React from "react";
import Banner from "./Banner/Banner";
import LoginWithGoogle from "@/components/LoginWithGoogle";
import Example from "./Example/Example";
import { Container } from "@/components/ui-library/container";
import { PortfolioGlobe } from "./AllOverTheWorldGlobe3D/AllOverTheWorldGlobe3D";

import { ThemeSwitcher } from "@/components/ui/buttons/theme-switcher/theme-switcher";
import { FeyCards } from "./FeyCards/FeyCards";
import { RollingText } from "./RollingText/RollingText";
import { SquigglyTextOut } from "./SquigglyText/SquigglyText";
import HeroParallaxDemo from "@/components/hero-parallax-demo";
import AnimatedBeamMultipleOutput from "./AnimatedBeamMultipleOutput/AnimatedBeamMultipleOutput";
import { StaggerTestimonials } from "./StaggerTestimonials/StaggerTestimonials";


const HomeComponent = () => {
  return (
    <Container >
      <ThemeSwitcher />
      <Banner />
      <StaggerTestimonials />
      <Example />
      <LoginWithGoogle />
      <PortfolioGlobe/>
      <FeyCards/>
      <SquigglyTextOut/>
      <HeroParallaxDemo/>
      <AnimatedBeamMultipleOutput/>
      {/* <RollingText/> */}
    </Container> 
  );
};

export default HomeComponent;
