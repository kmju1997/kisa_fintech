var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root', //파일로 따로 관리
  database : 'kisafintech'
});
 
connection.connect();
 

connection.query('SELECT name from user', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
 
connection.end();