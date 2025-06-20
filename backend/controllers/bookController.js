const Book = require('../models/Book');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books' });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book' });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, description, genre, coverImage } = req.body;
    const newBook = new Book({ title, author, description, genre, coverImage });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create book' });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, author, description, genre, coverImage } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, description, genre, coverImage },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update book' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};