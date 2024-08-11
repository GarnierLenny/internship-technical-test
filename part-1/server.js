const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.port | 8080;
const host = 'localhost';

const loadFileError = (errorCode, error, res) => {
  res.writeHead(errorCode, { 'Content-type': 'text/html' });
  res.end(`<html><h1>Could not load file: ${error}</h1></html>`);
};

const loadFile = (res, filepath, fileFormat) => {
  fs.readFile(path.join(__dirname, filepath), (error, data) => {
    if (error) return loadFileError(500, error, res);
    res.writeHead(200, { 'Content-Type': fileFormat });
    res.end(data);
  });
};

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      return loadFile(res, 'index.html', 'text/html');
    case '/favicon.ico':
      return;
    default:
      return loadFile(res, req.url, 'application/javascript')
  }
});

server.listen(port, host, () => {
  console.log(`Server is running on port http://${host}:${port}`);
});
