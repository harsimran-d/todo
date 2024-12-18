import cors from "cors";
import Express from "express";
const app = Express();

type Todo = {
  title: String;
  completed: boolean;
};

const ALL_TODOS = new Map<String, Todo>();

app.use(Express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/todos", function (_, res) {
  res.json(Object.fromEntries(ALL_TODOS));
});

app.get("/todos/:id", function (req, res) {
  const id = req.params["id"];
  const value = ALL_TODOS.get(id);
  if (value == undefined) {
    res.status(404).json({ error: "todo not found" });
    return;
  } else {
    res.status(201).json(value);
  }
});

app.post("/todos", function (req, res) {
  const body = req.body;
  const title = body["title"];
  if (title == undefined || title == "") {
    res.status(409).json({ error: "title is missing or empty" });
    return;
  }

  const randomId = parseInt((Math.random() * 10000).toString());
  ALL_TODOS.set(randomId.toString(), { title: title, completed: false });
  res.status(201).json({ message: "to do created", id: randomId });
});

app.put("/todos/:id", function (req, res) {
  const id = req.params["id"];
  const exists = ALL_TODOS.has(id);
  if (!exists) {
    res.status(404).json({ error: "todo does not exist" });
    return;
  }
  const body = req.body;
  const newTodo: Todo = { title: body["title"], completed: body["completed"] };
  if (newTodo.completed == undefined && newTodo.title == undefined) {
    res.status(403).json({ error: "missing both title and completed" });
    return;
  }
  const oldTodo = ALL_TODOS.get(id);
  ALL_TODOS.set(id, {
    title: newTodo.title ?? oldTodo!.title,
    completed: newTodo.completed ?? oldTodo!.completed,
  });

  res.status(201).json(ALL_TODOS.get(id));
});

app.delete("/todos/:id", function (req, res) {
  const id = req.params["id"];
  const deleted = ALL_TODOS.delete(id);
  if (deleted) {
    res.status(204).json({ message: "todo deleted successfully" });
  } else {
    res.status(404).json({ error: "todo not found" });
  }
});

app.listen("3000", function () {
  console.log("server running on port 3000");
});
