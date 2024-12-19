import axios from "axios";
import { useEffect, useState } from "react";
import AddTodoForm from "./todos/AddTodoForm";
import TodoList from "./todos/TodoList";
import { Todo } from "./types/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  async function handleClick(newTitle: string) {
    await axios.post("http://localhost:3000/todos", {
      title: newTitle,
    });
    fetchAllTodos();
  }
  async function fetchAllTodos() {
    console.log("calling");
    const response = await axios.get("http://localhost:3000/todos");
    if (response.status == 200) {
      let todosObj = response.data;
      let newTodos: Todo[] = Object.entries(todosObj).map((entry) => {
        let key = entry[0];
        let value = entry[1] as Todo;
        return {
          key: Number.parseInt(key),
          title: value["title"],
          completed: value["completed"],
        };
      }) as Todo[];
      setTodos(newTodos);
    } else {
      console.log("something went wrong");
    }
  }
  useEffect(() => {
    fetchAllTodos();
  }, []);
  return (
    <div className="m-auto flex w-6/12 flex-col justify-start space-y-3">
      <h1 className="m-auto text-center text-3xl text-black">Todo App</h1>
      <AddTodoForm callback={handleClick} />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
