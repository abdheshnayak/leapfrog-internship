const http = require("http");
const fs = require("fs");
var os = require("os");
var url = require("url");

const createServer = () => {
  http
    .createServer((req, res) => {
      var q = url.parse(req.url, true);
      var filename = "." + q.pathname;

      try {
        if (q.pathname != "/" && fs.existsSync(filename)) {
          console.log(q.pathname, filename);
          fs.readFile(filename, (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            return res.end();
          });
        } else {
          fs.readFile("./hello.txt", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.write("\nPlatform: " + os.platform());
            res.write("\nArchitecture: " + os.arch());
            res.write(
              parseUrl(
                "http://localhost:8080/default.htm?year=2017&month=february"
              )
            );
            return res.end();
          });
        }
      } catch (err) {
        console.error(err);
      }
    })
    .listen(8080);
};

const createFile = () => {
  fs.open("hello.txt", "w", function (err, file) {
    if (err) throw err;
    console.log("Saved!");
  });
};

const deleteFile = () => {
  fs.unlink("hello.txt", function (err) {
    if (err) throw err;
    console.log("File deleted!");
  });
};

const renameFile = () => {
  fs.rename("hello.txt", "hello2.txt", function (err) {
    if (err) throw err;
    console.log("File Renamed!");
  });
};

const writeTofile = () => {
  fs.writeFile("hello.txt", "\nHello world!", function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

const appendFileToCurrent = () => {
  fs.appendFile("./hello.txt", "\nHello World2!", function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

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

module.exports = {
  renameFile,
  writeTofile,
  deleteFile,
  createFile,
  createServer,
  appendFileToCurrent,
  parseUrl,
};
