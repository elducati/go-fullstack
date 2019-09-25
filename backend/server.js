const http = require('http');

const server = http.createServer((req, res) => {
    res.end('This is my server response and i am ready to move on');
});

server.listen(process.env.PORT || 3000);