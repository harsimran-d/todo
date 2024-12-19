import axios from "axios";
import { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import TodoItem, { TodoItemType } from "./TodoItem";

export default function TodoList({ todos }: { todos: Todo[] }) {
  console.log(todos);
  const [localTodos, setLocalTodos] = useState<Todo[]>([]);
  function deleteCallback(todoId: string) {
    axios.delete(`http://localhost:3000/todos/${todoId}`);
    setLocalTodos([
      ...localTodos.filter((val) => val.key.toString() != todoId),
    ]);
  }
  useEffect(() => {
    setLocalTodos(todos);
  }, [todos]);
  return (
    <div className="space-y-3">
      {localTodos.map((todo) => {
        console.log(todo);
        let todoItem: TodoItemType = {
          key: todo.key.toString(),
          title: todo.title,
          completed: todo.completed,
        };
        return (
          <TodoItem
            key={todo.key}
            todo={todoItem}
            deleteCallback={deleteCallback}
          ></TodoItem>
        );
      })}
    </div>
  );
}
