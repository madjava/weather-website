const port = process.env.PORT || 3000;
const http = require('http');
const app = require('./src/app');
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

server.on('listening', () => console.log(`Server running on ${port}`));
