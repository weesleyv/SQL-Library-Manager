var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

//Handle function to wrap each route
const asyncHandler = cb => {
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error) {
      res.status(500).send(error)
    }
  }
}

/* GET books listing. */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll({
    order: [["title", "ASC"]]
  });
  res.render('index', { books })
}));

/* Shows the create new book form */
router.get('/new', (req, res) => {
  res.render('new-book', {book: {}, title: "New Book"});
});

/* Shows book detail form */
router.get('/:id', asyncHandler(async(req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    res.render('book_detail', {book, title: book.title});
  } else {
    res.render('pageNotFound')
  }
}))

/* Posts a new book to the database */
router.post('/new', asyncHandler( async(req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect('/books')
  } catch(error) {
    if (error.name === 'SequelizeValidationError') { // checking the error
      book = await Book.build(req.body);
      res.render('new-book', {book, errors: error.errors, title: "New Book"})
    } else {
      throw error // error caught in the asyncHandler's catch block
    }
  }
}))


/* Updates book info in the database */
router.post('/:id/update', asyncHandler(async(req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      res.redirect('/books/' + book.id)
    } else {
      res.render('pageNotFound')
    }
  } catch(error) {
    if (error.name === 'SequelizeValidationError') {
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render('update-book', {book, errors: error.errors})
    } else {
      throw error
    }
  }
}))

/* Deletes a book */
router.post('/:id/delete', asyncHandler(async(req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.redirect('/');
  } else {
    res.render('pageNotFound')
  }
}))


module.exports = router;
