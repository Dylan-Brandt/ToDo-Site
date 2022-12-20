

const express = require('express');
const pug = require('pug');
const mysql = require('mysql');

const app = express();

const connectionPool = mysql.createPool({
    connectionLimit: 5,
    host     : 'cse-mysql-classes-01.cse.umn.edu',
    user     : 'C4131F22U14',
    password : '246',
    database : 'C4131F22U14'
});

app.set('view engine', 'pug');
app.set('views', './templates');
app.use(express.static(__dirname));
app.use(express.urlencoded());

app.listen(3006, () => {
    console.log('Server listening on port 3006');
});

app.get('/', (req, res) => {
    res.redirect('/today');
});

app.get('/today', (req, res) => {
    connectionPool.query("select * from tasks",
    (err, data) => {
        if(err) {
            console.error(err);
        }
        res.render('today.pug', {rowData: data});
    })
});

app.post('/today', (req, res) => {
    if(req.body.newTaskTitle.length == 0) {
        res.redirect('/today');
        return;
    }
    else {
        let queryStr = "insert into tasks (taskTitle, taskPriority, taskStatus) values "
    + `("${req.body.newTaskTitle}", "${req.body.newTaskPriority}", "not done")`;

    connectionPool.query(queryStr, 
        (err, data) => {
            if(err) {
                console.error(err);
            }
    res.redirect('/today');
    });
    }
});

app.post('/delete', (req, res) => {
    connectionPool.query(`delete from tasks where taskId = ${req.body.taskId}`, (err, data) => {
        if(err) {
            console.error(err);
        }
        res.redirect('/today');
        });
});

app.post('/done', (req, res) => {
    connectionPool.query(`select taskStatus from tasks where taskId = ${req.body.taskId}`, (err, data) => {
        if(err) {
            console.error(err);
        }
        if(data[0].taskStatus == 'done') {
            connectionPool.query(`update tasks set taskStatus = 'not done' where taskId = ${req.body.taskId}`, (err, data) => {
                if(err) {
                    console.error(err);
                }
                });
        }
        else {
            connectionPool.query(`update tasks set taskStatus = 'done' where taskId = ${req.body.taskId}`, (err, data) => {
                if(err) {
                    console.error(err);
                }
                });
        }
        res.redirect('/today');
        });
    
});

app.get('/upcoming', (req, res) => {
    res.render('upcoming.pug');
});