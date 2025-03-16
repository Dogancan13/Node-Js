// GET /todos - Get all todos
app.get("/todos", (req, res) => {
  const todosData = JSON.parse(fs.readFileSync(todosFilePath, "utf8"));
  res.json(todosData.todos);
});
