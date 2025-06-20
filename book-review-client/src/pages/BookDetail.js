import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import { AuthContext } from '../context/AuthContext';
import './BookDetail.css';

const BookDetail = () => {
  const { id } = useParams();
  const { token, user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookRes, reviewsRes] = await Promise.all([
          axios.get(`/books/${id}`),
          axios.get(`/reviews/${id}`)
        ]);
        setBook(bookRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/reviews',
        { book: id, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const res = await axios.get(`/reviews/${id}`);
      setReviews(res.data);
      setRating('');
      setComment('');
    } catch (err) {
      alert('Failed to post review');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(reviews.filter(review => review._id !== reviewId));
    } catch (err) {
      alert('Failed to delete review');
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-detail">
      <img src={book.coverImage} alt={book.title} />
      <h2>{book.title}</h2>
      <h4>By {book.author}</h4>
      <p><b>Genre:</b> {book.genre}</p>
      <p>{book.description}</p>

      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((rev) => (
          <div key={rev._id} className="review">
            <strong>{rev.user.name}:</strong> ⭐ {rev.rating}/5<br />
            {rev.comment}
            {user && user._id === rev.user._id && (
              <button onClick={() => handleDeleteReview(rev._id)}>Delete</button>
            )}
          </div>
        ))
      )}

      {token && (
        <form onSubmit={handleSubmit} className="review-form">
          <h4>Submit your review</h4>
          <input
            type="number"
            min="1"
            max="5"
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
          <textarea
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button type="submit">Post Review</button>
        </form>
      )}
    </div>
  );
};

export default BookDetail;