import Express from "express";

const app = Express();
app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen("3000", function () {
  console.log("server running on port 3000");
});
