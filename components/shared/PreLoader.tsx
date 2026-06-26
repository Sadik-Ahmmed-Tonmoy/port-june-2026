"use client";

import { useEffect, useState } from "react";
import loadingLottie from '@/assets/lottieFiles/animation_lmepaoc3.json';
import Lottie from "lottie-react";

const PreLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className={`${
          loading
            ? ""
            : "opacity-0 transition-opacity duration-500 pointer-events-none ease-in-out"
        } fixed w-full h-full flex justify-center items-center z-50 bg-black text-white`}
      >
        <div className="mx-auto">
          <Lottie
            className="md:w-96 h-56 md:h-96"
            animationData={loadingLottie}
            loop={true}
          />
          <p className="text-center text-6xl">
            <span data-aos="fade-up" data-aos-duration="1000">
              Eat{" "}
            </span>
            <span data-aos="fade-up" data-aos-duration="2000">
              {" "}
              Sleep{" "}
            </span>
            <span data-aos="fade-up" data-aos-duration="3000">
              {" "}
              Code{" "}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default PreLoader;