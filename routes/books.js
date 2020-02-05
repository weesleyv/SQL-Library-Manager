var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

//Handle function to wrap each route
const asyncHandler = cb => {
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error) {
      res.status(500).send(error);
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
  res.render('new-book');
});

/* Posts a new book to the database */
router.post('/new', asyncHandler( async(req, res) => {
  // const book = new Book.create(req.body);
  console.log(req.body);
  res.redirect('/books' + book.id)
}))

/* Shows book detail form */
router.get('/books/:id', asyncHandler(async(req, res) => {

}))

/* Updates book info in the database */
router.post('/books/:id', asyncHandler(async(req, res) => {

}))

/* Deletes a book */
router.post('/books/:id/delete', asyncHandler(async(req, res) => {

}))


module.exports = router;
