import React, { useEffect, useState, useContext } from 'react';
import axios from '../axiosConfig';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { token, user, logout } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [editData, setEditData] = useState({ rating: '', comment: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`/users/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(res.data.reviews);
      } catch (err) {
        console.error('Error loading profile:', err);
      }
    };

    if (user && token) fetchUserProfile();
  }, [user, token]);

  const handleEdit = (review) => {
    setEditingReview(review._id);
    setEditData({ rating: review.rating, comment: review.comment });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/reviews/${editingReview}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const res = await axios.get(`/users/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(res.data.reviews);
      setEditingReview(null);
    } catch (err) {
      alert('Failed to update review');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await axios.delete(`/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(reviews.filter((r) => r._id !== id));
    } catch (err) {
      alert('Failed to delete review');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <h2>👤 Profile</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <button onClick={handleLogout} className="logout-btn">Logout</button>

      <h3>📝 Your Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="review-list">
          {reviews.map((rev) =>
            editingReview === rev._id ? (
              <li key={rev._id} className="review-item">
                <form onSubmit={handleEditSubmit} className="edit-form">
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editData.rating}
                    onChange={(e) =>
                      setEditData({ ...editData, rating: e.target.value })
                    }
                    required
                    className="rating-input"
                  />
                  <textarea
                    value={editData.comment}
                    onChange={(e) =>
                      setEditData({ ...editData, comment: e.target.value })
                    }
                    required
                    className="comment-input"
                  />
                  <button type="submit" className="save-btn">Save</button>
                  <button
                    onClick={() => setEditingReview(null)}
                    type="button"
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </form>
              </li>
            ) : (
              <li key={rev._id} className="review-item">
                <strong>{rev.book?.title}</strong> - ⭐ {rev.rating}/5<br />
                <i>{rev.comment}</i><br />
                <button
                  onClick={() => handleEdit(rev)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(rev._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default Profile;