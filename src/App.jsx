import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SingleTodo from "./Pages/SingleTodo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:todoId" element={<SingleTodo />}></Route>
      </Routes>
    </>
  );
}

export default App;
