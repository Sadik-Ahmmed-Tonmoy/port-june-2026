import LoginWithGoogle from "@/components/LoginWithGoogle";
import { Container } from "@/components/ui-library/container";
import { PortfolioGlobe } from "./AllOverTheWorldGlobe3D/AllOverTheWorldGlobe3D";
import HeroSection from "./HeroSection/HeroSection";
import TechChip from "./TechChip/TechChip";

import HeroParallaxDemo from "@/components/hero-parallax-demo";
import { ThemeSwitcher } from "@/components/ui/buttons/theme-switcher/theme-switcher";
import AnimatedBeamMultipleOutput from "./AnimatedBeamMultipleOutput/AnimatedBeamMultipleOutput";

import { FeyCards } from "./FeyCards/FeyCards";
import { SquigglyTextOut } from "./SquigglyText/SquigglyText";
import { RandomizedTextEffect } from "@/components/ui/RandomizedTextEffect";
import ScrollTextAnimation from "./ScrollTextAnimation/ScrollTextAnimation";
import PortfolioScroll from "./PortfolioScroll/PortfolioScroll";
import HorizontalScroll from "@/components/ui/HorizontalScroll/HorizontalScroll";
import AnimationPage from "./Example/Example";
import AnimatedBeamPipelineShowcase from "./AnimatedBeamPipelineShowcase/AnimatedBeamPipelineShowcase";
import CareerExperienceTimeline from "./CareerExperienceTimeline/CareerExperienceTimeline";
import AboutMe from "./AboutMe/AboutMe";
import MySpecializations from "./MySpecializations/MySpecializations";



const HomeComponent = () => {
  return (
    < >
      <ThemeSwitcher />
      <HeroSection />
      <AboutMe />
      <MySpecializations />

      {/* <LoginWithGoogle /> */}
      {/* <AnimationPage/> */}

      {/* <FeyCards /> */}
      <div className="w-full flex justify-center py-6">
        <RandomizedTextEffect text='Production ready code' />
      </div>


      <HorizontalScroll />
      <HeroParallaxDemo />
      <PortfolioGlobe />
      <CareerExperienceTimeline />
      <PortfolioScroll />
      {/* <RollingText/> */}

    </>
  );
};

export default HomeComponent;
