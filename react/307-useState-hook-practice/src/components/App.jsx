import React,{useState} from "react";

function App() {
  let time = new Date().toLocaleTimeString();
  console.log(time);
  const [TIME,setTime]=useState(time);
  setInterval(getTime,1000);
  function getTime() {
     let newtime = new Date().toLocaleTimeString();
    setTime(newtime);
  }
  return (
    <div className="container">
      <h1>{TIME}</h1>
      <button onClick={getTime}>Get Time</button>
    </div>
  );
}

export default App;
