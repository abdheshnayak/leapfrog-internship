const fs = require("fs");

const file_system = require("./modules/file_system_with_http");

// deleteing file
try {
  if (fs.existsSync("hello.txt")) {
    file_system.deleteFile();
  } else {
    console.log("file not found");
  }
} catch (err) {
  console.error(err);
}

// file created
file_system.createFile();

// hello world written
file_system.writeTofile("Hello World!");

// Hello User! appended
file_system.appendFileToCurrent("Hello User!");

// server created at port 8080
file_system.createServer(8080);
