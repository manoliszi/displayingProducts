var mysql = require('mysql');
var express = require('express');
var Promise = require('bluebird');
var app = express();

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "projectdb"
});

var queryAsync = Promise.promisify(connection.query.bind(connection));
connection.connect();

process.stdin.resume()
process.on('exit', exitHandler.bind(null, { shutdownDb: true } ));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*'); //<-- you can change this with a specific url like http://localhost:3000
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.get('/products', (req, res) => {
  const page = parseInt(req.query.page);
  const startingPoint = (page - 1) * 10;

  queryAsync(`SELECT * FROM product_table LIMIT ${startingPoint}, 10`)
  .then(function(result){
    res.send(result)
  })
  .catch(function(err) {
    console.error(err);
    res.json({ err: err });
  });
})

app.get('/product', (req, res) => {
  const id = parseInt(req.query.id);

  queryAsync(`SELECT * FROM product_table WHERE serialNumber=${id}`)
  .then(function(result){
    res.send(result)
  })
  .catch(function(err) {
    console.error(err);
    res.json({ err: err });
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function exitHandler(options, err) {
  if (options.shutdownDb) {
    console.log('shutdown mysql connection');
    connection.end();
  }
  if (err) console.log(err.stack);
  if (options.exit) process.exit();
}