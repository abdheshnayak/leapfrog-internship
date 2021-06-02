const http = require("http");
const fs = require("fs");
var os = require("os");
var url = require("url");
const { request } = require("https");

const createServer = (port) => {
  http
    .createServer((req, res) => {
      // url implemented
      var q = url.parse(req.url, true);
      var filename = "." + q.pathname;

      try {
        if (q.pathname != "/" && fs.existsSync(filename)) {
          // reading file using pathname
          console.log(q.pathname, filename);
          fs.readFile(filename, (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            return res.end();
          });
        } else if (q.pathname == "/") {
          fs.readFile("./hello.txt", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });

            // text from hello.txt writen to response
            res.write(data);

            // os modules implemented
            res.write("\nPlatform: " + os.platform());
            res.write("\nArchitecture: " + os.arch());

            // url parser tested
            res.write(
              parseUrl(
                "http://localhost:8080/default.htm?year=2017&month=february"
              )
            );
            return res.end();
          });
        } else {
          res.writeHead(404);
          res.end();
        }
      } catch (err) {
        console.error(err);
      }
    })
    .listen(port);
};

// used to create a file with name hello.txt
const createFile = () => {
  fs.open("hello.txt", "w", function (err, file) {
    if (err) throw err;
    console.log("Saved!");
  });
};

// used to delete a file with name hello.txt
const deleteFile = () => {
  fs.unlink("hello.txt", function (err) {
    if (err) throw err;
    console.log("File deleted!");
  });
};

// // used to rename a file with name hello.txt to hello2.txt
const renameFile = () => {
  fs.rename("hello.txt", "hello2.txt", function (err) {
    if (err) throw err;
    console.log("File Renamed!");
  });
};

// used to write text to a file
const writeTofile = () => {
  fs.writeFile("hello.txt", "\nHello world!", function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

// append conntent to current file
const appendFileToCurrent = (message_text) => {
  fs.appendFile("./hello.txt", message_text, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

// url implementation (breaking the url)
const parseUrl = (adr) => {
  var q = url.parse(adr, true);

  console.log(q.host); //returns 'localhost:8080'
  console.log(q.pathname); //returns '/default.htm'
  console.log(q.search); //returns '?year=2017&month=february'

  var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
  console.log(qdata.month);

  return JSON.stringify({
    host: q.host,
    pathname: q.pathname,
    search: q.search,
    query: q.query,
  });
};

// exporting all the methods to use in index.js
module.exports = {
  renameFile,
  writeTofile,
  deleteFile,
  createFile,
  createServer,
  appendFileToCurrent,
  parseUrl,
};
