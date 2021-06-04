const { rejects } = require("assert");
const { json, urlencoded } = require("express");
const express = require("express");
const fs = require("fs");
const { resolve } = require("path");
const { createInflate } = require("zlib");

const app = express();
app.use(express.json());
app.use(urlencoded());

const createFile = () => {
  if (fs.existsSync("./data.json")) {
    console.log("found");
    return true;
  } else {
    console.log("not found");
    fs.open("./data.json", "w", function (err, file) {
      if (err) throw err;
    });
    return true;
  }
};
const readFile = async () => {
  const myPromise = new Promise((resolve, rejects) => {
    fs.readFile("./data.json", (err, data) => {
      if (err) rejects(err);
      else if (data.toString()) {
        resolve(JSON.parse(data.toString()));
      } else resolve({});
    });
  });
  return myPromise;
};
const writeFile = (data) => {
  fs.writeFile("data.json", JSON.stringify(data), function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

app.get("/get-user", async (req, res) => {
  if (createFile()) {
    const data = await readFile();
    if (data) res.send(data);
    else res.status(400).json({ msg: "No data present" });
  }
});

app.post("/update-user", (req, res) => {
  const { name } = req.body;
  if (name) {
    writeFile({ name: name });
    res.send("Successfully Updated");
  }
});

app.delete("/delete-user", (req, res) => {
  if (fs.existsSync("./data.json"))
    fs.unlink("data.json", function (err) {
      if (err) throw err;

      res.send("deleted succesfully");
    });
  else res.status(400).send("something went wrong");
});

app.listen(8080, () => {
  console.log("server running at port 8080");
});
