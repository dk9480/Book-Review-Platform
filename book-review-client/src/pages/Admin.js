import React, { useEffect, useState, useContext } from 'react';
import axios from '../axiosConfig';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    coverImage: ''
  });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.isAdmin) {
      navigate('/');
    }
    fetchBooks();
  }, [user, navigate]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/books/${editingId}`, formData);
      } else {
        await axios.post('/books', formData);
      }
      fetchBooks();
      setFormData({
        title: '',
        author: '',
        description: '',
        genre: '',
        coverImage: ''
      });
      setEditingId(null);
    } catch (err) {
      console.error('Error saving book:', err);
    }
  };

  const handleEdit = (book) => {
    setFormData({
      title: book.title,
      author: book.author,
      description: book.description,
      genre: book.genre,
      coverImage: book.coverImage
    });
    setEditingId(book._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await axios.delete(`/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  if (!user || !user.isAdmin) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      
      <div className="admin-form">
        <h3>{editingId ? 'Edit Book' : 'Add New Book'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <input
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
          <input
            name="genre"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleInputChange}
          />
          <input
            name="coverImage"
            placeholder="Cover Image URL"
            value={formData.coverImage}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <button type="submit">{editingId ? 'Update' : 'Add'} Book</button>
          {editingId && (
            <button type="button" onClick={() => {
              setFormData({
                title: '',
                author: '',
                description: '',
                genre: '',
                coverImage: ''
              });
              setEditingId(null);
            }}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="admin-books">
        <h3>Books List</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>
                  <button onClick={() => handleEdit(book)}>Edit</button>
                  <button onClick={() => handleDelete(book._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;