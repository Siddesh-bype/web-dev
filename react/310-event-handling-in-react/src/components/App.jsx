import React, { useState } from "react";

function App() {
const [headingText, setHeadingText] = useState("hello");
const [bg, setbg] = useState(false);

function handleClick() {
  setHeadingText("Submitted");
}

function onMouseOver() {
  setbg(true);
}

function onMouseOut() {
  setbg(false);
}

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button
        style={{ backgroundColor: bg ? "black" : "white" }}
        onClick={handleClick}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}>
        Submit
      </button>
    </div>
  );
}

export default App;
