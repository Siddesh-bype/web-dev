import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [headingText, setHeadingText] = useState("HELLO");
  const [OnMouse, setOnMouse] = useState(false);

  function handleChange(event) {
    console.log(event.target.value);
    setName(event.target.value);
  }
  function handleClick() {
    setHeadingText("Hello " + name);
  }
  function handleMouseOver() {
    setOnMouse(true);
  }
  function handleMouseOut() {
    setOnMouse(false);
  }
  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input
        onChange={handleChange}
        type="text"
        placeholder="What's your name?"
        value={name}
      />
      <button
        style={{backgroundColor: OnMouse? "black":"white" }}
        onClick={handleClick}
        onMouseOut={handleMouseOut}
        onMouseOver={handleMouseOver}>
        Submit
      </button>
    </div>
  );
}

export default App;
