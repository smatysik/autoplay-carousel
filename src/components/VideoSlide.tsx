import React, { useState, useEffect, useRef } from "react";

interface Props {
  src: string;
  type: string;
  activeIndex: number;
  index: number;
  onLoadVideoCallback?: (duration: number, index: number) => void;
  onUpdateVideoCallback?: (currentTime: number) => void;
  onEndedVideoCallback?: () => void;
}

const Video = ({
  src,
  type,
  activeIndex,
  index,
  onLoadVideoCallback,
  onUpdateVideoCallback,
  onEndedVideoCallback,
}: Props): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        Promise.resolve(videoRef.current.play())
          .then(() => {
            console.log(`Playing ${index}. Active index is ${activeIndex}`);
          })
          .catch((error) => {
            console.log(`Play Rejected: ${error.message}`);
          });
      }
    };

    if (isLoaded && index === activeIndex) {
      playVideo();
    }
  }, [activeIndex, index, isLoaded]);

  const onLoad = (video: HTMLVideoElement) => {
    const duration = video.duration;
    setIsLoaded(true);
    console.log("Event: load", { duration });
    onLoadVideoCallback && onLoadVideoCallback(duration * 1000, index);
  };

  const onUpdate = () => {
    videoRef.current &&
      onUpdateVideoCallback &&
      onUpdateVideoCallback(videoRef.current.currentTime * 1000);
  };

  const onEnded = () => {
    onEndedVideoCallback && onEndedVideoCallback();
  };

  return (
    <video
      ref={videoRef}
      width="320"
      height="240"
      controls
      muted
      onLoadedMetadata={(event) => {
        onLoad(event.target as HTMLVideoElement); // TODO
      }}
      onTimeUpdate={onUpdate}
      onEnded={onEnded}
    >
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
