const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser')

const app = express();
const PORT = 3000;

app.use(cookieParser());
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


var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: '3306',
    database: 'todo_list'
})


// get tasks
app.get('/task/:uid', (req, res) => {
    const {uid} = req.params;

    connection.query(`SELECT id, content, completed, edit FROM tasks where uid=${uid}`, function (err, rows) {
        if(err) throw err
        console.log('\x1b[33m',`load`);

        res.send(rows);
    })
})

// delete task
app.delete('/task/:uid/:id', (req, res) => {
    console.log('\x1b[31m',`delete`);
    const { id, uid } = req.params;
    connection.query(`DELETE FROM tasks WHERE id = ${id} and uid = ${uid}`);
    res.send(true);
})

// add task
app.post('/task', (req, res) => {
    console.log('\x1b[32m',`add`)
    const {content, uid} = req.body;
    if(!content) return;
    connection.query(`INSERT INTO tasks VALUES (NULL, ${uid}, '${content}', '0', '0')`);

    res.send(true);
})


// edit task
app.put('/task/edit/:id', (req,res) => {
    const { id } = req.params;
    const { content, uid } = req.body;
    if(!content) return;
    connection.query(`UPDATE tasks SET content = "${content}" WHERE id = ${id} and uid = ${uid}`);
    console.log('\x1b[35m',`edit`)

    res.send(true);
})

// change completed value
app.put('/task/:id/completed', (req,res) => {
    console.log('\x1b[35m',`change status`);
    const { id } = req.params;
    const { uid } = req.body;
    connection.query(`UPDATE tasks SET completed = !completed WHERE id = ${id} and uid = ${uid}`);

    res.send(true);
})

const users = []

// login
app.post('/login', (req, res) => {
    var users = []
    connection.query('SELECT id, login, password FROM users', (err,rows) => {
        if(err) throw err

        users = rows;

    if(!users.length){
        res.send(false);
    }
    const user = req.body;

    const u = users.find(u => u.login === user.login);
    if(u){
        const hash = u.password;
        bcrypt.genSalt(12, function(err, salt) {
            bcrypt.compare(user.password, hash, function(err, comp){
                if (err) throw err;

                if(comp){
                    console.log('\x1b[36m%s\x1b[0m',`${user.login} logged in`);
                    res.send(''+u.id);
                }
                else{
                    console.log('\x1b[36m%s\x1b[0m',`${user.login} not logged in`);
                    res.send(false);
                }

            })
        })
    }
    else{
        console.log('\x1b[36m%s\x1b[0m',`${user.login} not logged in`);
        res.send(false);
    }


    })
})

// registration
app.put('/register', (req, res) => {
    const data = req.body;
    var logins = [];
    connection.query('SELECT login FROM users', (err, rows) => {
        rows.forEach(el => {
            logins.push(el.login);
        });


    if(!logins.find(login => login === data.login)){
        bcrypt.genSalt(12, function(err, salt) {
            bcrypt.hash(data.password, salt, function(err, hash){
                connection.query(`INSERT INTO users(login, password) VALUES ('${data.login}','${hash}')`, err => {
                    if (err) throw err;
                    console.log('\x1b[0m',`${data.login} registered`);
                    res.send(true);
                    });

            })
        })
    }else{
        console.log('\x1b[0m',`${data.login} not registered`);
        res.send(false);
    }


    })
});

// logout
app.get('/logout', (req, res) => {
    console.log('\x1b[31m',`logged out`);
    res.send(true);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
