import React from "react";
import { createRoot } from "react-dom/client";
const fname = "Siddesh";
const lname = "Shirote";
const num = 69;
const root = createRoot(document.getElementById("root"));
root.render(
  <div>
    <h1>Hello {fname + " " + lname}!</h1>
    {/* <h1>Hello {`${fname} ${lname}`}!</h1> es6 template */}
    <p>your lucky number is {num}!</p>
  </div>,
);

// ReactDOM.render(<h1>Hello World!</h1>, document.getElementById("root"));

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
