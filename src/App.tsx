import * as React from "react";

import AutoplayCarousel from "./components/AutoplayCarousel";

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

      <AutoplayCarousel
        slides={[
          {
            src: "https://placekitten.com/320/240",
            type: "image/jpg",
          },
          {
            src:
              "https://static.videezy.com/system/resources/previews/000/035/284/original/MVI_4230.mp4",
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
