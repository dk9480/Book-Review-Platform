const Review = require('../models/Review');

const createReview = async (req, res) => {
  const { book, rating, comment } = req.body;
  try {
    const review = new Review({
      user: req.user._id,
      book,
      rating,
      comment,
    });
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create review' });
  }
};

const getReviewsForBook = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId }).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load reviews' });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    const updated = await review.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating review' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Review.deleteOne({ _id: review._id });
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting review' });
  }
};

module.exports = {
  createReview,
  getReviewsForBook,
  updateReview,
  deleteReview
};