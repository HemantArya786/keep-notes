import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SingleTodo from "./Pages/SingleTodo";

function App() {
  const [allNotes, setAllNotes] = useState([]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home allNotes={allNotes} setAllNotes={setAllNotes} />}
        ></Route>
        <Route
          path="/:todoId"
          element={<SingleTodo allNotes={allNotes} setAllNotes={setAllNotes} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
