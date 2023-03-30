const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Initialize SQLite database
const dbPath = path.join(__dirname, 'glossary.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`Connected to the SQLite database at ${dbPath}`);
    db.run('CREATE TABLE IF NOT EXISTS glossary (id INTEGER PRIMARY KEY, term TEXT, definition TEXT)');
  }
});

// Add new entry
app.post('/save-entry', (req, res) => {
  const { term, definition } = req.body;

  db.run('INSERT INTO glossary (term, definition) VALUES (?, ?)', [term, definition], (err) => {
    if (err) {
      res.status(500).send({ message: 'Failed to save entry' });
    } else {
      res.status(200).send({ message: 'Entry saved successfully' });
    }
  });
});

// Get all entries
app.get('/entries', (req, res) => {
  db.all('SELECT * FROM glossary', (err, rows) => {
    if (err) {
      res.status(500).send({ message: 'Failed to fetch entries' });
    } else {
      res.status(200).send(rows);
    }
  });
});

// Get a single entry by index
app.get('/entries/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  db.all('SELECT * FROM glossary', (err, rows) => {
    if (err || index < 0 || index >= rows.length) {
      res.status(404).send('Not found');
    } else {
      res.json(rows[index]);
    }
  });
});

// Get specific entry
app.get('/get-entry/:id', (req, res) => {
  const id = req.params.id;

  db.get('SELECT * FROM glossary WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).send({ message: 'Failed to fetch entry' });
    } else {
      res.status(200).send(row);
    }
  });
});



// Update entry
app.put('/update-entry/:id', (req, res) => {
  const id = req.params.id;
  const { term, definition } = req.body;

 console.log('Received update request:', id, term, definition);
  console.log(`Updating entry with id: ${id}, term: ${term}, definition: ${definition}`);

  db.run('UPDATE glossary SET term = ?, definition = ? WHERE id = ?', [term, definition, id], function(err) {
    if (err) {
      console.error(`Error updating entry: ${err.message}`);
      res.status(500).send({ message: 'Failed to update entry' });
    } else if (this.changes === 0) {
      console.error(`No entry found with id: ${id}`);
      res.status(404).send({ message: 'Entry not found' });
    } else {
       console.log('Rows affected:', this.changes);
      console.log('Entry updated successfully');
      res.status(200).send({ message: 'Entry updated successfully' });
    }
  });
});






// Delete entry
app.delete('/delete-entry/:id', (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM glossary WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).send({ message: 'Failed to delete entry' });
    } else {
      res.status(200).send({ message: 'Entry deleted successfully' });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
