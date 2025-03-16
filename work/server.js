const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log requests
const logRequests = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    method: req.method,
    url: req.url,
  };

  // Log to console
  console.log(logEntry);

  // Log to logs.json (Bonus)
  const logsPath = path.join(__dirname, "logs.json");
  let logs = [];
  if (fs.existsSync(logsPath)) {
    logs = JSON.parse(fs.readFileSync(logsPath, "utf8"));
  }
  logs.push(logEntry);
  fs.writeFileSync(logsPath, JSON.stringify(logs, null, 2));

  next();
};

app.use(logRequests);

// Route to get all books
app.get("/books", (req, res) => {
  const booksData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "books_store.db.json"), "utf8")
  );
  res.json(booksData.books);
});

// Route to add a new book
app.post("/books", (req, res) => {
  const newBook = req.body;
  const booksData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "books_store.db.json"), "utf8")
  );

  // Add the new book to the list
  booksData.books.push(newBook);

  // Save the updated list back to the file
  fs.writeFileSync(
    path.join(__dirname, "books_store.db.json"),
    JSON.stringify(booksData, null, 2)
  );

  res.status(201).json(newBook);
});

// Route to rent a book by ID
app.post("/books/rent/:id", (req, res) => {
  const bookId = req.params.id;
  const booksData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "books_store.db.json"), "utf8")
  );

  const book = booksData.books.find((b) => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!book.isAvailable) {
    return res.status(400).json({ message: "Book is not available for rent" });
  }

  // Mark the book as rented
  book.isAvailable = false;

  // Save the updated list back to the file
  fs.writeFileSync(
    path.join(__dirname, "books_store.db.json"),
    JSON.stringify(booksData, null, 2)
  );

  res.json({ message: "Book rented successfully", book });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
