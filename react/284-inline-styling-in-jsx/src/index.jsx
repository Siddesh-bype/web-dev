import React from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
const customStyle={
    color : "blue",
    fontSize : "10px",
    margin : "40px"
}
root.render(
<h1 style={customStyle}>Hello World!</h1>

);

// const styles = StyleSheet.create({});
// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
