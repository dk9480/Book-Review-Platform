const User = require('../models/User');
const Review = require('../models/Review');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const reviews = await Review.find({ user: req.params.id }).populate('book', 'title');
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      reviews: reviews,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserProfile };