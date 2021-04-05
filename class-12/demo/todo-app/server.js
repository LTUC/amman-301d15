'use strict';

require('dotenv').config();

const express = require('express');
const pg = require('pg');

const PORT = process.env.PORT || 3000;
const app = express();

// add a middleware to parse request body
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err=> console.log(err));

// localhost:5000/
app.get('/', getTasks);
app.get('/add', addTaskForm);
app.post('/add', saveTask);
app.get('/task/:id', getOneTask); // one item and id value from URL


client.connect().then(()=> {
    app.listen(PORT, ()=> console.log(`Listening on ${PORT}`));
});

function getTasks(request, response) {
    // 1- get list of tasks from DB
    // 2- render index.ejs & pass the tasks list
    const SQL = 'SELECT * from task';
    client.query(SQL).then(result=> {
        response.render('index', {result: result.rows});
    });
}

function addTaskForm(request, response) {
    response.render('pages/add-view');
}

function saveTask(request, response) {
    console.log(request.body);
  
    // JS ES6 destructing
    // const {title, description, category, status} = request.body;
    const title = request.body.title
    const description = request.body.description
    const category = request.body.category
    const status = request.body.status
    
    const values = [title, description, category, status];

    // insert into my database
    const SQL = `INSERT 
        INTO task (title, description, category, status)
        VALUES ($1, $2, $3, $4) RETURNING * 
         `;

    client.query(SQL, values).then(()=> {
        response.redirect('/');
    })
}

function getOneTask(request, response) {
    // http://localhost:5000/task/2
    // draw details of one task
    // 1- get data for a specific task
    // 2- render a page to show these details of one task
    console.log(request.query); // comes after ?k1=v1&k2=v2
    console.log(request.params); // part of the url localhost:5000/task/23
    const id = request.params.id;
    const SQL = 'SELECT * FROM task WHERE id=$1';
    const values = [id];
    client.query(SQL, values).then(result=> {
        console.log("details:", result.rows);
        response.render('pages/details-view', {task: result.rows[0]});
    })
}