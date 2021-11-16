const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var table = 'admin';
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'nowyuser',
    password: 'nowyuser',
    port: '3306',
    database: 'todo_list'
})


// get tasks
app.get('/task', (req, res) => {
    console.log(`load from ${table}`);

        connection.query(`SELECT * FROM ${table};`, function (err, rows) {
        if(err) throw err

        res.send(rows);
    })
})

// delete task
app.delete('/task/:id', (req, res) => {
    console.log(`delete from ${table}`);
    const { id } = req.params;
    connection.query(`DELETE FROM ${table} WHERE id = ${id}`);
    res.send(true);
})

// add task
app.post('/task', (req, res) => {
    console.log(`add from ${table}`)
    const cont = req.body.content;
    if(!cont) return;
    connection.query(`INSERT INTO ${table} VALUES (NULL, '${cont}', '0', '0')`);

    res.send(true);
})


// edit task
app.put('/task/:id', (req,res) => {
    console.log(`edit from ${table}`)
    const { id } = req.params;
    const cont = req.body.content;
    if(!cont) return;
    connection.query(`UPDATE ${table} SET content = "${cont}" WHERE id = ${id}`);

    res.send(true);
})

// change completed value
app.put('/task/:id/completed', (req,res) => {
    console.log(`change status from ${table}`);
    const { id } = req.params;
    connection.query(`UPDATE ${table} SET completed = !completed WHERE id = ${id}`);

    res.send(true);
})

const users = [
    {name: 'admin', pass: '1234'},
    {name: 'user', pass: '123'}
]

// authentication
app.post('/login', (req, res) => {
    var users = []
    connection.query('SELECT login, password FROM users', (err,rows) => {
        if(err) throw err

        users = rows;

    if(!users.length) return
    const user = req.body;
    let auth = false;


    if(users.find(u => u.login === user.login && u.password === user.password)){
        auth = true;
        table = user.login;
    }


    res.status(200).send(auth);
    })
})

// registration
app.post('/register', (req, res) => {
    const data = req.body;
    var logins = [];
    connection.query('SELECT login FROM users', (err, rows) => {
        rows.forEach(el => {
            logins.push(el.login);
        });


    if(!logins.find(login => login === data.login)){
        connection.query(`INSERT INTO users(login, password) VALUES ('${data.login}','${data.password}')`);
        connection.query(`CREATE TABLE ${data.login}(
            id INT(11) PRIMARY KEY AUTO_INCREMENT,
            content TEXT NOT NULL,
            completed TINYINT(1) NOT NULL DEFAULT 0,
            edit TINYINT(1) NOT NULL DEFAULT 0);`);

    }else{
        console.log('Login taken');
    }


    })

    res.sendStatus(200)
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
