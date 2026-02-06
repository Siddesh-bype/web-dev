import React from "react";
import { createRoot } from "react-dom/client";
import Heading from "./Header";
import Footer from "./Footer";
import Note from "./Note";

function App() {
  return (
    <div>
      <Heading />
      <Note />
      <Footer />
    </div>
  );
}

export default App;
