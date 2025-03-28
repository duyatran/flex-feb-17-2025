const express = require('express');
const morgan = require('morgan');
const PORT = 5000;

const app = express();
// Add morgan middle to log incoming requests
app.use(morgan('dev'));
// Tell Express we are using ejs for views (and res.render())
app.set('view engine', 'ejs');
// Equivalent to body-parser, parse form data into JS object
app.use(express.urlencoded({extended: true}));

// helper function to get next id (last id + 1)
const nextId = () => {
  const keys = Object.keys(books);
  return Number(keys[keys.length-1]) + 1;
};

const books = {
  3: {
    id: 3,
    author: 'Jane Austen',
    title: 'Pride and Prejudice',
    year: 1813
  },
  4: {
    id: 4,
    author: 'Victor Hugo',
    title: 'The Hunchback of Notre-Dame',
    year: 1831
  }
};

// Index/List all books
app.get('/books', (req, res) => {
  const templateVars = { books: books };
  res.render('book_list', templateVars);
});

// Show one particular book
app.get('/books/:id', (req, res) => {
  const templateVars = {
      id: req.params.id,
      book: books[req.params.id]
  };
  res.render('book_show', templateVars);
});

// Create a new book
app.post('/books', (req, res) => {
  // console.log(req.body);
  const id = nextId();
  const newBook = {
    id: id,
    author: req.body.author,
    title: req.body.title,
    language: req.body.language,
    year: req.body.year
  }

  books[id] = newBook;
  res.redirect('/books');
});

// Update/Edit A Book
// NOTE: if using an HTML form button to edit,
// we cannot use PUT/PATCH HTTP method, so we can
// only use POST
app.post('/books/:id', (req, res) => {
  const bookId = req.params.id;
  books[bookId].language = req.body.language;
  res.redirect(`/books/${bookId}`);
});

// Delete a Book
// NOTE: if using an HTML form button to delete,
// we cannot use DELETE HTTP method, so we can
// only use POST
app.post('/books/:id/delete', (req, res) => {
  delete books[req.params.id];
  res.redirect('/books');
});

app.listen(PORT,
  console.log(`This app is running on port ${PORT}`)
)
