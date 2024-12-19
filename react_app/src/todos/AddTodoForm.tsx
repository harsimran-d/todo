import { useState } from "react";

export default function AddTodoForm({
  callback,
}: {
  callback: (s: string) => void;
}) {
  const [newTitle, setNewTitle] = useState("");

  return (
    <form
      className="flex"
      onSubmit={(e) => {
        e.preventDefault();
        console.log("i ran");
        callback(newTitle);
        setNewTitle("");
      }}
    >
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="rounded-lg border border-black"
      />
      <div className="w-2"></div>

      <button type="submit">Add</button>
    </form>
  );
}
