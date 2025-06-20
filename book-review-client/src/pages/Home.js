import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('/books');
        setBooks(res.data);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(search.toLowerCase()) &&
      (genre === '' || book.genre.toLowerCase().includes(genre.toLowerCase()))
    );
  });

  return (
    <div className="home-container">
      <h2>All Books</h2>
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div className="book-list">
        {filteredBooks.map((book) => (
          <div className="book-card" key={book._id}>
            <img src={book.coverImage} alt={book.title} />
            <h3>{book.title}</h3>
            <p>By {book.author}</p>
            <p>{book.genre}</p>
            <Link to={`/book/${book._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;