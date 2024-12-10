const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Add this to handle CORS

const app = express();
const port = 3000;

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Hacker',
  database: 'blockchain'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware
app.use(cors()); // Allow requests from different origins
app.use(express.json()); // Parse JSON bodies

// API endpoint to get all CIDs from the database
app.get('/api/cids', (req, res) => {
  const query = 'SELECT cid FROM cids'; // Replace 'cids' with your actual table name

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving CIDs from database');
    }
    const cids = results.map((row) => row.cid);
    res.json(cids);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
