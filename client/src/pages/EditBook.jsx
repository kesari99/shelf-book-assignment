import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

const EditBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const book = location.state;
  const [formData, setFormData] = useState({ ...book });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = Cookies.get('token');

    try {
      const res = await fetch(`/api/books/updateBook`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      navigate('/book-list');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <>
      <Header />
      <div className='p-3 mx-auto max-w-lg'>
        <h1 className="text-center items-center my-7 font-semibold text-3xl">
          Edit Book Details
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Book Title"
            className='border rounded-lg shadow-md p-3 outline-none'
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="author"
            value={formData.author}
            placeholder="Author"
            className='border rounded-lg shadow-md p-3 outline-none'
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Your Email"
            className='border rounded-lg shadow-md p-3 outline-none'
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Your Name"
            className='border rounded-lg shadow-md p-3 outline-none'
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            placeholder="Book Location"
            className='border rounded-lg shadow-md p-3 outline-none'
            onChange={handleChange}
            required
          />

          <button className='border p-2 text-white text-lg rounded-lg bg-slate-700 shadow-md hover:opacity-70'>
            {loading ? 'Updating Book...' : 'Update Book'}
          </button>
        </form>
        {error && <p className='text-red-700 mt-5'>{error}</p>}
      </div>
    </>
  );
};

export default EditBook;