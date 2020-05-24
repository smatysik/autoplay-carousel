import React, { useState, useEffect } from "react";

import { useTimer } from "../hooks/useTimer";

import { formatTime, getPercentage } from "../utils";

export interface Slide {
  src: string;
}

interface Props {
  slides: Slide[];
  slideDuration?: number;
}

const Carousel = ({ slides, slideDuration = 7000 }: Props): JSX.Element => {
  const [activeSlide, setActiveSlide] = useState(0);
  const duration = slideDuration;
  const { pause, reset, start, time } = useTimer(duration);

  /* Change slide after slide duration */
  useEffect(() => {
    if (time >= duration) {
      setActiveSlide((activeSlide + 1) % slides.length);
      reset();
    }
  }, [activeSlide, duration, slides, reset, time]);

  /* Reset states after slide changes */
  useEffect(() => {
    start();
  }, [activeSlide, reset, start]);

  /* Init carousel */
  useEffect(() => {
    start();
    return () => pause();
  }, [start, pause]);

  return (
    <>
      <div>Slide duration = {formatTime(duration)}s</div>
      <div>Elapsed slide time = {formatTime(time)}s</div>
      <div>{`Slide progress = ${getPercentage(time, duration)}%`}</div>
      <div>
        {slides.map(({ src }, index) => {
          return (
            <div
              key={index}
              style={{ display: activeSlide === index ? "block" : "none" }} // "carousel"
            >
              <img src={src} alt={""} />
            </div>
          );
        })}
      </div>
      <div>{`Slide ${activeSlide + 1} of ${slides.length}`}</div>
    </>
  );
};

export default Carousel;
