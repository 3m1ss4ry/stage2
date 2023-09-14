const express = require('express');
const mysql = require('mysql2');
const app = express();

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'crud_api',
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Configure middleware to parse JSON requests
app.use(express.json());

// Define your API routes and CRUD operations here

// Create a new person
app.post('/api/persons', (req, res) => {
  const { name, value } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const query = 'INSERT INTO persons (name, value) VALUES (?, ?)';
  const values = [name, value];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting into the database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(201).json({ message: 'Person created', id: result.insertId });
  });
});

// Read a person by ID
app.get('/api/persons/:id', (req, res) => {
  const personId = req.params.id;

  const query = 'SELECT * FROM persons WHERE id = ?';
  const values = [personId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.status(200).json(result[0]);
  });
});

// Update a person by ID
app.put('/api/persons/:id', (req, res) => {
  const personId = req.params.id;
  const { name, value } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const query = 'UPDATE persons SET name = ?, value = ? WHERE id = ?';
  const values = [name, value, personId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating the database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.status(200).json({ message: 'Person updated' });
  });
});

// Delete a person by ID
app.delete('/api/persons/:id', (req, res) => {
  const personId = req.params.id;

  const query = 'DELETE FROM persons WHERE id = ?';
  const values = [personId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error deleting from the database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.status(200).json({ message: 'Person deleted' });
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
