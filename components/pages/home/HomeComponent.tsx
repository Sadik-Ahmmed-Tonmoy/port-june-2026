import LoginWithGoogle from "@/components/LoginWithGoogle";
import { Container } from "@/components/ui-library/container";
import { PortfolioGlobe } from "./AllOverTheWorldGlobe3D/AllOverTheWorldGlobe3D";
import Banner from "./Banner/Banner";

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



const HomeComponent = () => {
  return (
    < >
      <ThemeSwitcher />
      <Banner />
      <LoginWithGoogle />
      <PortfolioGlobe/>
      <FeyCards/>
      <AnimationPage/>
     
      <HeroParallaxDemo/>
      
      <HorizontalScroll/>
      <PortfolioScroll/>
      {/* <RollingText/> */}
     
      <RandomizedTextEffect text='Production ready code' />
    </> 
  );
};

export default HomeComponent;
