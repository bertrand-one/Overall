import React, { useEffect, useState } from 'react'
import logo from '../assets/images/logo.png'
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bertrand from '../assets/profiles/bertrand.JPG'
import revant from '../assets/profiles/revant.png'

const Nav = () => {
  const [search, setSearch] = useState(false);
  const [data, setData] = useState({});
  const navigate = useNavigate()
  const logout = () => {

    axios.get('/logout')
  .then((res) => {
    navigate("/")
  })
  .catch((err) => console.log(err))
  }

  //get user details
  useEffect(() => {
    axios.get('/profile')
    .then((res) => {
      setData(res.data)
    })
    .catch((err) => console.log(err))
  }, [])
  
  return (
    <header className='w-full nav fixed top-0 z-40 flex justify-between items-center h-[10vh] bg-white/30 max-sm:px-10 px-20 backdrop-blur-lg'>
      <div className='flex justify-center items-center'>
         <img src={logo} className='h-[9vh]' />
         <p className='font-bold text-xl max-sm:hidden font-anton'>Development</p>
      </div>
      <div className='flex items-center justify-center flex-1 px-10 max-sm:px-3 max-md:justify-end'>
        <div className='icon'>
        <FaSearch className='hidden max-md:flex' onClick={() => setSearch(true)} />
        </div>
        <input type='text' className='rounded border w-full px-5 py-2 max-md:hidden' placeholder='Search,...' />
      </div>
      <div className='flex justify-center items-center gap-8 max-sm:gap-4'>
          <div className='w-10 h-10 rounded-full bg-blue-200' style={{background: `url(${bertrand})`,backgroundPosition: 'center',backgroundSize: 'cover'}}></div>
          <p className='cursor-pointer flex items-center py-2 px-3 rounded-xl justify-center hover:bg-orange-100' onClick={() => logout()}>Sign out</p>
      </div>
      {search &&
       <div className='fixed flex items-center top-0 left-0 bg-black/30 w-full px-5 py-3'>
         <input className='rounded border w-full px-5 py-2' placeholder='search...' />
         <div onClick={() => setSearch(false)} className='px-2 py-3 border rounded hover:bg-red-200 cursor-pointer bg-white'>
         <FaTimes/>
         </div>
       </div>
      }
    </header>
  )
}

export default Nav
