import React from "react";

var isLoggedIn = true;
function App() {
  return (
    <div className="container">{isLoggedIn ? <h1>Hello</h1> : <Login />}</div>
  );
}

export default App;
