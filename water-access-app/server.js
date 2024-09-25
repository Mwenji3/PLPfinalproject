const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Middleware to parse incoming requests with JSON
app.use(express.json());

// Creating a connection to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Paul@1234', 
  database: 'water_access_db'
});

// Connecting to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Set up routes
app.get('/', (req, res) => {
  res.send('Welcome to the Water Access API!');
});

app.get('/api/water-sources', (req, res) => {
    const query = 'SELECT id, location, latitude, longitude FROM water_sources';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
  
app.post('/api/report', (req, res) => {
    const { user_id, water_source_id, report_details } = req.body;
  
    const query = 'INSERT INTO water_source_reports (user_id, water_source_id, report_details) VALUES (?, ?, ?)';
    db.query(query, [user_id, water_source_id, report_details], (err, results) => {
      if (err) throw err;
      res.send('Report submitted successfully!');
    });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
