const http = require('http');
const app = require('./app');
const db = require('./models')
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'Groupomania'
});

connection.connect();


const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

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

app.get('/', (req, res)=> {
  const sqlInsert = "INSERT INTO users (prenom, nom) VALUES ('Asmiya', 'Jackiriya');"
  connection.query(sqlInsert,(err, res)=> {
    res.send('hello world')
  })
  connection.on('error', function(err) {
    console.log("[mysql error]",err);
  });
});

// db.sequelize.sync().then(()=> {
  server.listen(port);
// });
