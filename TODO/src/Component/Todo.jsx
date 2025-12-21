import React, { useState } from "react";

function Todo({ handleTodo }) {
  const [todo, setTodo] = useState("");

  const addTodo = () => {
    handleTodo({
        id:Date.now(),
        text:todo,
        isCompleted:false,
    });
    setTodo("");
  };

  return (
    <div className="flex gap-2 mb-6">
      <input 
        type="text" 
        value={todo} 
        onChange={(e) => setTodo(e.target.value)} 
        placeholder="Add a new task..." 
        className="flex-1 bg-white/90 px-4 py-3 rounded-xl shadow-inner outline-hidden focus:ring-2 focus:ring-emerald-400 transition-all placeholder:text-gray-400"
      />
      <button 
        onClick={addTodo}
        className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all"
      >
        ➕
      </button>
    </div>
  );
}
export default Todo;