import React from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";


function Home() {
  return (
    <>
    <Header /> 
    <div className='flex flex-col justify-center items-center w-full  h-full'>
      <h1 className='text-7xl my-20'>Add your Employee Here </h1>
      <Link to='/add-book' >
      <div className='flex items-center gap-4'>
        <span className='text-2xl text-blue-700'>Add here
        </span>
        <FaArrowRight className='w-5 h-5 ' fill='blue' />
        </div>
      </Link>
    </div>
    </>
  )
}

export default Home