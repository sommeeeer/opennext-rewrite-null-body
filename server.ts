import http from 'node:http';

const PORT = 4000;
const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  
  // To force send a body with 304, we need to bypass Node.js validation
  // by directly writing to the socket
  const socket = res.socket;

  if (!socket) {
    console.log("No socket available to write response.");
    return;
  }
  
  // Manually craft the HTTP response
  socket.write('HTTP/1.1 304 Not Modified\r\n');
  socket.write('Content-Type: text/plain\r\n');
  socket.write('OpenNext-Reproduction: True\r\n');

  // We need to specify the content length for the body
  const body = 'This is an invalid 304 response with a body!';
  socket.write(`Content-Length: ${Buffer.byteLength(body)}\r\n`);
  socket.write('\r\n'); // End of headers
  
  // Write the body and end the response
  socket.write(body);
  socket.end();
  
  // Note that we're bypassing res.end() as we're handling the socket directly
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});