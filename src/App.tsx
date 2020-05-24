import * as React from "react";

import Carousel from "./components/Carousel";

import "./styles.css";

export default function App(): JSX.Element {
  return (
    <div className="App">
      <h1>AutoplayCarousel</h1>
      <ul>
        <li>Supports images or video</li>
        <li>Each image slide will auto-page after 7 seconds</li>
        <li>Each video slide will auto-page after video finishes playing</li>
      </ul>

      <Carousel
        slides={[
          {
            src: "https://placekitten.com/320/240",
            type: "image/jpg",
          },
          {
            src:
              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            type: "video/mp4",
          },
          {
            src: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            type: "video/mp4",
          },
          {
            src: "https://vjs.zencdn.net/v/oceans.mp4",
            type: "video/mp4",
          },
        ]}
      />
    </div>
  );
}
