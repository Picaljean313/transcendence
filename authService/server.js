const https = require('https');
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return false;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3001');

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);

server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);

/**/

bash :
mkdir cert
openssl req -nodes -new -x509 -keyout cert/server.key -out cert/server.cert

project/
│
├── cert/
│   ├── server.key
│   └── server.cert
│
├── app.js
├── server.js
└── package.json


https://localhost:3001
⚠️ Le navigateur affichera "Not secure" car certificat auto-signé (normal en dev).


const https = require('https');
const fs = require('fs');
const app = require('./app');
const normalizePort = val => { const port = parseInt(val, 10);
    if (isNaN(port)) { return false; } 
    if (port >= 0) { return port; } 
    return false; }; 
    const port = normalizePort(process.env.PORT || '3001'); 
    const options = { key: fs.readFileSync('./cert/server.key'), cert: fs.readFileSync('./cert/server.cert') }; 
    const errorHandler = error => { if (error.syscall !== 'listen') { throw error; } 
    const address = server.address(); 
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port; 
    switch (error.code) { 
        case 'EACCES': 
        console.error(bind + ' requires elevated privileges.'); 
        process.exit(1); 
        break; 
        case 'EADDRINUSE': 
        console.error(bind + ' is already in use.'); 
        process.exit(1); 
        break; 
        default: 
        throw error; 
    } }; 

const server = https.createServer(options, app); 
server.on('error', errorHandler); 
server.on('listening', () => { 
    const address = server.address(); 
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port; 
    console.log('HTTPS Listening on ' + bind); 
}); 

server.listen(port);