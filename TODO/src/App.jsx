import Todo from "./Component/Todo";
import TodoList from "./Component/TodoList";
import React, { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("my_todos");
    return storedTodos
      ? JSON.parse(storedTodos)
      : [{id:1,text:"Eat breakfast",isCompleted:true}, {id:2,text:"Run a mile",isCompleted:false}, {id:3,text:"Code in React",isCompleted:false}];
  });

  const createTodo = (todo) => {
    if (todo.text.trim() === "") return;
    setTodos((prev) => [...prev, todo]);
  };

  useEffect(() => {
    localStorage.setItem("my_todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-400 to-cyan-500 py-10 px-4 flex justify-center">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl h-fit border border-white/30">
        <h1 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-md">
          My Tasks
        </h1>
        <Todo handleTodo={createTodo} />
        <TodoList todos={todos} updateTodos={setTodos} />
      </div>
    </div>
  );
}

export default App;
