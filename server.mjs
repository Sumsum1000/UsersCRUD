import express, { query } from 'express';
import fs from 'fs';
//import '/Users.json';
import loadJson from 'load-json-file';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
let users = loadJson.sync('./users.json');

// app.get('/', (req, res) => {
//     const users = fs.readFileSync('index.html', { encoding: 'utf-8'});
//     res.send(users);
// });

// Get all users
app.get('/users', (req, res) => {
    res.send(users);
})

// Get single users
app.get('/users/:id', (req, res) => {
    const [singleUser] = users.filter(user => user.id == req.params.id);
    res.send(singleUser);
})

// Add user
app.post('/users', (req, res) => {
    users.push(req.body);
    res.send('O.K');
})

// Update user
app.put('/users/:id', (req, res) => {
    const [user] = users.filter(user => user.id == req.params.id);
    user.name = req.query.name;
    user.email = req.query.email;
    res.send('O.K');
})

// Delete user
app.delete('/users/:id', (req, res) => {
  users = users.filter(user => user.id != req.params.id); 
  res.send('O.K'); 
})


app.listen(8080);
console.log('8080 is running');