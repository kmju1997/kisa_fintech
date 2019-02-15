var express = require('express')
var app = express();
var path = require('path')
var request = require('request')
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', //파일로 따로 관리
    database: 'kisafintech'
});
connection.connect();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
// 반드시 views에 html파일 넣어야 함 

for (i = 1; i < 3; i++) {
    console.log(i)
    app.get('/'+i, function (req, res) {
        connection.query('Select name as "이름" from user where id=?',[i], function (error, results, field) {
            if (error) throw error;
            res.send(results);
        })
    })
}

app.get('/ejsTest', function (req, res) {
    res.render('index')
})

app.post('/userJoin', function (req, res) {
    var name = req.body.name;
    var phone = req.body.phone;
    var age = req.body.age;
})

app.get('/join', function(req, res){
    res.render('join')
})


app.listen(3000)