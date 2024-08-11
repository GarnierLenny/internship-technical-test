const http = require('http');

const port = process.env.port | 8080;
const host = 'localhost';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<html><h1>Nodejs rendered html</h1></html>');
});

server.listen(port, host, () => {
  console.log(`Server is running on port http://${host}:${port}`);
});
