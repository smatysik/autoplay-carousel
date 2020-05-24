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
          },
          {
            src: "https://placekitten.com/321/240",
          },
          {
            src: "https://placekitten.com/322/240",
          },
          {
            src: "https://placekitten.com/323/240",
          },
        ]}
      />
    </div>
  );
}
