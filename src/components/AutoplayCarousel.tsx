import React, { useState, useEffect, useCallback, useRef } from "react";

import ImageSlide from "./ImageSlide";
import VideoSlide from "./VideoSlide";

import { useTimer } from "../hooks/useTimer";

import { getSeconds, getPercentage } from "../utils";

export interface Slide {
  src: string;
  type: string;
}

interface Props {
  slides: Slide[];
  slideDuration?: number;
}

const AutoplayCarousel = ({
  slides,
  slideDuration = 7000,
}: Props): JSX.Element => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [duration, setDuration] = useState(slideDuration);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const videoDurationRefs = useRef<number[]>([]);

  const { pause, reset, start, time } = useTimer(duration);

  const isVideoSlide = useCallback(
    (index: number): boolean => {
      return slides[index].type.includes("video");
    },
    [slides],
  );

  /* Change slide after slide duration */
  useEffect(() => {
    // If we are currently on a video slide,
    // only a video end event will trigger a slide change
    if (!isVideoSlide(activeSlide) && time >= duration) {
      setActiveSlide((activeSlide + 1) % slides.length);
      reset();
    }
  }, [activeSlide, duration, isVideoSlide, slides, reset, time]);

  /* Reset states after slide changes */
  useEffect(() => {
    setCurrentVideoTime(0);
    start();
  }, [activeSlide, reset, start]);

  /* Init carousel */
  useEffect(() => {
    start();
    return () => pause();
  }, [start, pause]);

  /**
   * If we are on a video slide, set the video's duration
   * to be the slide duration
   */
  useEffect(() => {
    if (
      videoDurationRefs.current.length &&
      videoDurationRefs.current[activeSlide]
    ) {
      const newDuration = videoDurationRefs.current[activeSlide];
      if (newDuration !== 0) {
        setDuration(newDuration);
      }
    } else {
      setDuration(slideDuration);
    }
  }, [activeSlide, slideDuration]);

  /**
   * Let's focus on these three callbacks
   */
  /* Get video durations after load */
  const handleVideoLoad = (duration: number, index: number) => {
    videoDurationRefs.current[index] = duration;
    if (index === 0) {
      setDuration(duration);
    }
  };

  /* Update current video time */
  const handleVideoUpdate = (currentTime: number) => {
    setCurrentVideoTime(currentTime);
  };

  /* Page to the next slide on video end */
  const handleVideoEnd = () => {
    setActiveSlide((activeSlide + 1) % slides.length);
    reset();
  };

  return (
    <>
      <div>Slide duration = {getSeconds(duration)}s</div>
      <div>Elapsed slide time = {getSeconds(time)}s</div>
      <div>
        {isVideoSlide(activeSlide)
          ? `Slide progress = ${getPercentage(currentVideoTime, duration)}%`
          : `Slide progress = ${getPercentage(time, duration)}%`}
      </div>
      <div>
        {slides.map(({ src, type }, index) => {
          return (
            <div
              key={index}
              style={{ display: activeSlide === index ? "block" : "none" }} // "carousel"
            >
              {isVideoSlide(index) ? (
                <VideoSlide
                  src={src}
                  type={type}
                  isActive={index === activeSlide}
                  onLoadVideoCallback={(duration) => {
                    handleVideoLoad(duration, index);
                  }}
                  onUpdateVideoCallback={handleVideoUpdate}
                  onEndedVideoCallback={handleVideoEnd}
                />
              ) : (
                <ImageSlide src={src} />
              )}
            </div>
          );
        })}
      </div>
      <div>{`Slide ${activeSlide + 1} of ${slides.length}`}</div>
    </>
  );
};

export default AutoplayCarousel;
