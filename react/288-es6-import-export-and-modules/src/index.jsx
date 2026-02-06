import React from "react";
import { createRoot } from "react-dom/client";
import * as pi from "Maths.js";

const root = createRoot(document.getElementById("root"));
root.render(
  <ul>
    <li>{pi.default}</li>
    <li>{pi.doublepi()}</li>
    <li>{pi.triplePi()}</li>
  </ul>
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
