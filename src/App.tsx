import * as React from "react";

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
    </div>
  );
}
