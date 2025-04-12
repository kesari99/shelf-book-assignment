import React, { useState } from 'react';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    location: '',
    email: '',
    name: ''
  });
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    setLoading(true)

    try {
      const res = await fetch('/api/books/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false)
        setError(data.message)
        return;
      }

      setError(null)
      setLoading(false)
      navigate('/book-list')

    } catch (err) {
      setLoading(false)
      setError(err.message)
    }
  };

  return (
    <>
      <Header />
      <div className='p-3 mx-auto max-w-lg'>
        <h1 className="text-center items-center my-7 font-semibold text-3xl">
          Add New Book
        </h1>
        <form onSubmit={HandleSubmit} className='flex flex-col gap-3'>
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            className='border rounded-lg shadow-md p-3 outline-none'
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            className='border rounded-lg shadow-md p-3 outline-none'
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className='border rounded-lg shadow-md p-3 outline-none'
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className='border rounded-lg shadow-md p-3 outline-none'
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Book Location"
            className='border rounded-lg shadow-md p-3 outline-none'
            onChange={handleChange}
            required
          />

          <button className='border p-2 text-white text-lg rounded-lg bg-slate-700 shadow-md hover:opacity-70'>
            {loading ? 'Adding Book...' : 'Add Book'}
          </button>
        </form>
        {error && <p className='text-red-700 mt-5'>{error}</p>}
      </div>
    </>
  );
};

export default AddBook;