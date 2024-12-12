const http = require('http');
const { networkInterfaces } = require('os');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(networkInterfaces()));
});

server.listen(3001, () => {
    console.log('App running on port 3001');
    console.log(process.env.NODE_ENV)
});
