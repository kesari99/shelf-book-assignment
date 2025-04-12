// SignIn.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice';

const SignIn = () => {
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())
      const res = await fetch('https://shelf-book-assignment.onrender.com/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return;
      }

      Cookies.set('token', data.token, { 
        expires: 7,
        secure: true,
      sameSite: 'Strict'
      })
      dispatch(signInSuccess({ 
        user: data.user,
        role: data.user.role 
      }))

      // Navigate based on role
      if (data.user.role === 'owner') {
        navigate('/add-book')
      } else {
        navigate('/book-list')
      }

    } catch (err) {
      dispatch(signInFailure(err.message))
    }
  }

  return (
    <div className='p-3 mx-auto max-w-lg'>
      <h1 className='text-center font-semibold my-7 text-3xl'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='border rounded-lg shadow-md p-3 outline-none w-full'
          onChange={handleChange}
          required
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='border rounded-lg shadow-md p-3 outline-none w-full'
          onChange={handleChange}
          required
        />
        <button disabled={loading} className='bg-slate-700 rounded-lg p-3 w-full text-white text-xl'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <p>Don't have an account?
        <Link to='/sign-up'>
          <span className='text-blue-700'> Sign up</span>
        </Link>
      </p>
      {error && <p className='text-red-700 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn