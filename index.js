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

app.get('/api/mahasiswa', (req, res) => {
    db.query('SELECT * FROM biodata', (err, results) => {
        if (err) {
            console.error('Error executting query: ' + err.stack);
            res.status(500).send('Error fetching mahasiswa');
            return;
        }
        res.json(results);
    });
});

app.post('/api/mahasiswa', (req, res) => {
    const { nama, alamat, agama } = req.body;

    if (!nama || !alamat || !agama) {
        return res.status(400).json({message : "Nama, Alamat, dan Agama harus diisi"});
    }

    db.query
    ('INSERT INTO biodata (nama, alamat, agama) VALUES (?, ?, ?)',
    [nama, alamat, agama],
    (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({message: "Database error"});
        }
        res.status(201).json({message: "User created successfully"});
    });
});