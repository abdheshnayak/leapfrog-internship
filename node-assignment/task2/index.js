const express = require("express");
const fs = require("fs");
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
  if (!req.query.name) return res.send("User Name not provided.");

  res.send(`User Name is <b>${req.query.name}</b>`);
});

// finding a path and returning file if exist
app.get("/:path", (req, res) => {
  const pathname = req.params.path;
  console.log(pathname);
  if (fs.existsSync(pathname)) {
    res.sendFile(__dirname + "/" + pathname);
  } else {
    console.log("not found");
    res.status(404);
    res.end();
  }
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
