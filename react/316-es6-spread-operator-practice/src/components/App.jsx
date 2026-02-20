import React, { useState } from "react";

function App() {
  const [point, setPoint] = useState("");
  const [items, setItems] = useState([]);

  function handleChangePoint(event) {
    const newValue = event.target.value;
    setPoint(newValue);
  }

  function handleAdd() {
    setItems((prevView)=>{
      return[...prevView, point];
    });
    setPoint("");
  }
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChangePoint} type="text" value={point} />
        <button onClick={handleAdd}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((Item, index) => (
            <li key={index}>{Item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
