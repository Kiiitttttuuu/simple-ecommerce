const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price TEXT, image TEXT)");
    const stmt = db.prepare("INSERT INTO products (name, price, image) VALUES (?, ?, ?)");
    stmt.run("Product 1", "$10.00", "/images/product1.jpg");
    stmt.run("Product 2", "$20.00", "/images/product2.jpg");
    stmt.finalize();
});

app.get('/products', (req, res) => {
    db.all("SELECT * FROM products", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
