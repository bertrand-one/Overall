import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import logo from '../assets/images/logo.png'
import login from '../assets/images/login.png'

const Login = () => {
    const navigate = useNavigate()
     //values of the inputs
  const[values, setValues] = useState({
    names: '',
    password: '',
})

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

    //submit work function
  function handleSubmit(e){
    e.preventDefault()

    axios.post('/login', values)
    .then((res) => {
        console.log(res);
        navigate('/works');
    })
    .catch((err) => {
      
        console.error('An unexpected error occurred:'+err);
    
    })
}


  return (
    <div className='flex items-center justify-center h-[100vh] bg-gray-100'>
      <form onSubmit={handleSubmit} className='px-14 pb-10 bg-white'>
        <div className='flex flex-col items-center justify-center my-9'>
          <img src={logo} alt='overall logo' className='w-[100px]' />
          <div className='w-full h-2 rounded-full bg-gradient-to-r from-gray-500 via-orange-500'></div>
          <h1>Login Overall</h1>
        </div>
        <p>user name:</p>
        <input type='text' className='input' name='names' onChange={handleChange} required  />
        <p>password:</p>
        <input type='password' className='input' name='password' onChange={handleChange} required  /><br/>
        <button type='submit' className='mt-5 py-3 font-bold text-white hover:bg-orange-400 rounded text-center w-full bg-blue-500'>Login</button>
      </form>
      <div className='bg-blue-200 max-md:hidden'>
        <img src={login} alt='login image' />
      </div>
    </div>
  )
}

export default Login
