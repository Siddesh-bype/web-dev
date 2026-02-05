//Create a react app from scratch.
import React from "react";
import { createRoot } from "react-dom/client";
//It should display 2 paragraph HTML elements.
//The paragraphs should say:
//Created by YOURNAME.
//Copyright CURRENTYEAR.
//E.g.
//Created by Angela Yu.
//Copyright 2019.
const fname="Siddesh";
const lname="Shirote"
const year = new Date().getFullYear();
const root=createRoot(document.getElementById("root"));
root.render(
<div>
    <p>Created by {fname} {lname} </p>
    <p>Copyright @{year}</p>
</div>
);
// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
