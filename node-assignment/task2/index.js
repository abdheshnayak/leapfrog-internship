const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Server running");
});

// dynamic url
app.get("/user/:name", (req, res) => {
  res.send(`User Name is <b>${req.params.name}</b>`);
});

//  url with Query Params
app.get("/user/", (req, res) => {
  res.send(`User Name is <b>${req.query.name}</b>`);
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

// handling 404
app.use((req, res, next) => {
  res.status(404);
  res.end();
});
