const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.port | 8080;
const host = 'localhost';

const server = http.createServer((req, res) => {
  fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-type': 'text/html' });
      res.end(`<html><h1>Could not load html file: ${err}</h1></html>`);
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

server.listen(port, host, () => {
  console.log(`Server is running on port http://${host}:${port}`);
});
