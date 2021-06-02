const file_system = require("./modules/file_system_with_http");

file_system.writeTofile("Hello World!");
file_system.appendFileToCurrent();
file_system.createServer();
file_system.parseUrl(
  "http://localhost:8080/default.htm?year=2017&month=february"
);
