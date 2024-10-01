import {React, useState,useEffect} from 'react';
import Nav from '../components/Nav';
import Sidenav from '../components/Sidenav';
import { FaPlus, FaTimes,FaHistory, FaCheckCircle, FaExclamationCircle, FaTrashAlt, FaBriefcase } from 'react-icons/fa';
import axios from 'axios'
import { Link } from 'react-router-dom';

const Works = () => {
  const [add, setAdd] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  //fetched data of work
  const [data, setData] = useState([])

  var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.querySelector(".nav").style.top = "0";
      document.querySelector(".sub-nav").style.top = "10vh";
      document.querySelector(".sidenav").style.top = "10vh";
    } else {
      document.querySelector(".nav").style.top = "-100px";
      document.querySelector(".sidenav").style.top = "0";
      document.querySelector(".sub-nav").style.top = "0";
    }
    prevScrollpos = currentScrollPos;
  }

  //values of the inputs
  const[values, setValues] = useState({
    ab: '',
    name: '',
    desc: '',
    client: '',
    start: '',
    end: '',
    tec: '',
})

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

//submit work function
  function handleSubmit(e){
    e.preventDefault()

    axios.post('/add_work', values)
    .then((res) => {
        console.log(res);
         
        fetchWorks();
        setAdd(false)
        setSuccess(true)
        setError('');

    })
    .catch((err) => {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.error); // Set error message to display in the UI
    } else {
        console.error('An unexpected error occurred:', err);
        setError('An unexpected error occurred. Please try again later.');
    }
    })
}

//fech work function
const fetchWorks = () => {
  axios.get('/work')
  .then((res) => {
    setData(res.data)
  })
  .catch((err) => console.log(err))
}

//fetch work from database
useEffect(() => {
  
  fetchWorks();

}, [])


//delete work
function handleDelete(id){
  axios.delete('/delete/'+id)
  .then((res) => {
     console.log("deleted");
     fetchWorks();
  })
  .catch((err) => console.log(err))
}
  

  return (
    <section className='w-full'>
      <div className='main'><div className='gradient' /></div>
      <main className='app'>
        <Nav />
        <div className='flex items-start justify-between w-full h-[90vh]'>
          <Sidenav />
          <div>what?</div>
        <div className='w-[80%] mt-[10vh]'>
        <div className='bg-white/30 border-b-2 border-t-2 fixed backdrop-blur-lg sub-nav py-2 px-10 w-full flex items-center justify-start gap-16 max-sm:gap-4 max-sm:px-5'>
            <p className='flex justify-between gap-2 items-center max-sm:gap-1'>Recent works <FaHistory /></p>
            <div onClick={() => setAdd(true)} className='px-5 py-3 max-sm:px-2 hover:bg-white bg-blue-200 flex items-center justify-between gap-2 rounded cursor-pointer'> 
              <FaPlus /> Add a work
            </div>
          </div>

          <div className='w-full py-6 mt-16 px-10 max-sm:p-1'>
          {data == "" ? <p className='flex items-center gap-2 justify-start'> <FaExclamationCircle /> No Works found!</p> :
      <table className='table'>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th className='max-sm:hidden'>Work name</th>
            <th className='max-md:hidden'>Starting time</th>
            <th>ending time</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((work) => {
              return (
               <tr key={work.work_id}>
                <td className='min-w-[20px]'></td>
                <td><Link to={'/work/'+work.work_id}><div className='p-3 rounded-lg border-[1px] border-green-300 hover:bg-white bg-green-100 text-green-700 flex items-center justify-center font-bold max-w-[100px]'>
                  {work.work_ab}
                </div></Link>
                </td>
                <td className='max-sm:hidden'>{work.work_name}</td>
                <td className='max-md:hidden'>{work.start_date}</td>
                <td>{work.end_date}</td>
                <td><div onClick={() => handleDelete(work.work_id)} className='text-red-500 cursor-pointer flex justify-center items-center p-2 hover:bg-gray-300 rounded-full'><FaTrashAlt /></div></td>
              </tr>)
            })
          }
        </tbody>
      </table>
       }
          </div>
        </div>
        </div>

       
        {success &&
          <div className='fixed w-full h-[100vh] top-0 left-0 bg-black/30 flex justify-center items-center z-40'>
            <div className='px-10 py-5 bg-white rounded-xl fade-in'>
              <div className='float-right icon' onClick={() => setSuccess(false)}>
                <FaTimes />
              </div>
              <p className='pr-10 flex justify-center items-center gap-3'> <FaCheckCircle className='text-green-500 text-3xl' />  Work created successfully!</p>
            </div>
          </div>
        }
      </main>
    </section>
  )
}

export default Works
