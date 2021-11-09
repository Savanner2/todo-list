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

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_list'
})
  
connection.connect()

// get tasks
app.get('/task', (req, res) => {

    connection.query('SELECT * FROM tasks', function (err, rows) {
        if(err) throw err

        res.send(rows);
    })

    console.log("loaded");
})

// delete task
app.delete('/task/:id', (req, res) => {
    console.log('delete');
    const { id } = req.params;
    connection.query(`DELETE FROM tasks WHERE id = ${id}`);
    res.send(true);
})

// add task
app.post('/task', (req, res) => {
    console.log('add')
    const cont = req.body.content;
    if(!cont) return;
    connection.query(`INSERT INTO tasks VALUES (NULL, '${cont}', '0', '0')`);

    res.send(true);
})


// edit task
app.put('/task/:id', (req,res) => {
    console.log('edit')
    const { id } = req.params;
    const cont = req.body.content;
    if(!cont) return;  
    connection.query(`UPDATE tasks SET content = "${cont}" WHERE id = ${id}`);

    res.send(true);
})

// change completed value
app.put('/task/:id/completed', (req,res) => {
    console.log('change status');
    const { id } = req.params;
    connection.query(`UPDATE tasks SET completed = !completed WHERE id = ${id}`);

    res.send(true);
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
