import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { currentUser } = useSelector(state => state.user)


  const fetchBooks = async () => {
    try {
      const token = Cookies.get('token');
      const res = await fetch('https://shelf-book-assignment.onrender.com/api/books/getBooks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Failed to fetch books');
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (email) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const token = Cookies.get('token');
        const response = await fetch(`https://shelf-book-assignment.onrender.com/api/books/deleteBook/${email}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Failed to delete book');
        fetchBooks();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = (book) => {
    navigate('/edit-book', { state: book });
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="p-4">
        <h1 className="text-center text-3xl font-semibold my-7">Book Inventory</h1>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search books by title"
            className="border outline-none border-gray-600 p-2 rounded-lg shadow-md w-1/3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 p-2">Title</th>
              <th className="border border-gray-200 p-2">Author</th>
              <th className="border border-gray-200 p-2">Owner Email</th>
              <th className="border border-gray-200 p-2">Owner Name</th>
              <th className="border border-gray-200 p-2">Location</th>
              {
                currentUser.role === "owner" && 
                <th className="border border-gray-200 p-2">Actions</th>

              }
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book._id}>
                  <td className="border border-gray-200 p-2">{book.title}</td>
                  <td className="border border-gray-200 p-2">{book.author}</td>
                  <td className="border border-gray-200 p-2">{book.email}</td>
                  <td className="border border-gray-200 p-2">{book.name}</td>
                  <td className="border border-gray-200 p-2">{book.location}</td>

                  {currentUser.role === "owner" && <td className="border border-gray-200 p-2">

                    <button
                      onClick={() => handleEdit(book)}
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.email)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>}

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </>
  );
};

export default BookList;