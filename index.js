const express = require('express');
let mysql = require("mysql2");
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const db = mysql.createConnection({
  host: 'localhost',
    user: 'root',
    password: 'Qilqil.123',
    database: 'mahasiswa',
    port: 3309
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:'+ err.stack);
    return;
  }
    console.log('Connected successfully');
});