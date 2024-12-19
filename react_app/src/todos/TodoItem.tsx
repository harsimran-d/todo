import axios from "axios";
import { useState } from "react";

export type TodoItemType = {
  key: string;
  title: string;
  completed: boolean;
};

export default function TodoItem({
  todo,
  deleteCallback,
}: {
  todo: TodoItemType;
  deleteCallback: (todoId: string) => void;
}): JSX.Element {
  const [status, setStatus] = useState(todo.completed);
  async function handleCheckboxClick() {
    setStatus(!status);
    await axios.put(`http://localhost:3000/todos/${todo.key}`, {
      completed: !status,
      title: todo.title,
    });
  }
  async function handleDelete() {
    deleteCallback(todo.key);
  }
  return (
    <div className="flex">
      <input
        type="checkbox"
        checked={status}
        onChange={handleCheckboxClick}
      ></input>
      <div className="w-2"></div>
      <p>{todo.title}</p>
      <div className="flex-1"></div>
      <button className="text-red-500" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
