import React, { useState } from "react";

function TodoList({ todos, updateTodos }) {
  const [editingId, setEditingId] = useState(null);
  const [newTodo, setNewTodo] = useState("");

  const handleEdit = (todoText, id) => {
    setEditingId(id);
    setNewTodo(todoText);
  };

  const handleSave = (id) => {
    updateTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newTodo } : todo)));
    setEditingId(null);
  };

  const handleCompletion = (id) => {
    updateTodos(todos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)));
  };

  return (
    <ol className="space-y-3">
      {todos.map(({ id, text, isCompleted }) => (
        <li key={id} className="flex items-center group">
          <div className={`flex-1 flex items-center px-2 py-1 rounded-xl transition-all duration-300 ${
            editingId === id ? "bg-white shadow-lg" : "bg-white/10 hover:bg-white/20"
          }`}>
            
            {/* Show checkbox only when NOT editing */}
            {editingId !== id && (
              <input 
                type="checkbox" 
                checked={isCompleted} 
                onChange={() => handleCompletion(id)}
                className="w-5 h-5 ml-2 cursor-pointer accent-emerald-400 shrink-0"
              />
            )}

            <input
              type="text"
              value={editingId === id ? newTodo : text}
              readOnly={editingId !== id}
              autoFocus={editingId === id}
              onChange={(e) => setNewTodo(e.target.value)}
              className={`w-full h-10 px-3 text-base outline-none transition-all ${
                editingId === id 
                  ? "text-gray-800 font-medium" 
                  : `text-white cursor-default bg-transparent border-none ${isCompleted ? "line-through opacity-50" : ""}`
              }`}
            />

            <div className="flex gap-1 ml-2 shrink-0">
              {editingId !== id ? (
                <>
                  <button onClick={() => handleEdit(text, id)} className="p-2 text-white/70 hover:text-white">
                    ✎
                  </button>
                  <button 
                    onClick={() => updateTodos(todos.filter((t) => t.id !== id))}
                    className="p-2 text-white/50 hover:text-red-400"
                  >
                    🗑
                  </button>
                </>
              ) : (
                <button onClick={() => handleSave(id)} className="p-2 text-emerald-500 hover:scale-110 font-bold">
                  ✔
                </button>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default TodoList;