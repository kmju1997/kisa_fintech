var express = require('express')
var app = express();
var path = require('path')
var request = require('request')
var mysql = require('mysql');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', //파일로 따로 관리
    database: 'kisafintech'
});

connection.connect();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//request string parsing 해줌 

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
    var name = req.body.nameajax;
    var phone = req.body.phoneajax;
    var age = req.body.ageajax;

    connection.query('INSERT INTO user (name, user_id, user_password) VALUES (?,?,?)', [name, phone, age], 
    function(err, result){
        if(err){
            throw err
        }
        else{
            console.log("DATA INPUT")
        }
    })

    console.log(name, phone, age)
})

app.get('/join', function(req, res){
    res.render('join')
})

app.get('/design', function(req, res){
    res.render('designed')
})
app.listen(3000)