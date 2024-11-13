import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Sidenav from '../components/Sidenav'
import { FaBoxes, FaListAlt, FaPlus, FaTimes } from 'react-icons/fa'
import axios from 'axios'

const Departments = () => {
  const [data, setData] = useState([])
  const [add, setAdd] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    image: null,
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = e => {
    setFormData(prevState => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    data.append('names', formData.name);
    data.append('type', formData.type);
    data.append('image', formData.image);

    try {
      const response = await axios.post('/add_department', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Failed to upload file.');
    }
  };



//fech Derpartment function
const fetchDepartment = () => {
    axios.get('/department')
    .then((res) => {
      setData(res.data)
    })
    .catch((err) => console.log(err))
  }
  
  //fetch Derpartment from database
  useEffect(() => {
    
    fetchDepartment();
  
  }, [])

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
            <p className='flex justify-between gap-2 items-center max-sm:gap-1'><FaListAlt /> All Departments </p>
            <div onClick={() => setAdd(true)} className='px-5 py-3 max-sm:px-2 hover:bg-white bg-blue-200 flex items-center justify-between gap-2 rounded cursor-pointer'> 
              <FaPlus /> Add a Department
            </div>
          </div>
          
          <div className='w-full py-6 mt-16 px-10 max-sm:p-1 grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:px-4 gap-4'>
            {data.map((depart) => {
                return(
            <div className='bg-white rounded cursor-pointer'>
                <div className='bg-blue-100 w-full h-[200px]'></div>
                <div className='px-10 py-5'>
                <h2 className='font-bold text-lg'>{depart.name}</h2>
                <p>{depart.type}</p>
                </div>
            </div>
                )
              })
             }

          </div>
           
       </div>

       </div>

       {add &&
         <div className='modal-cont'>
          <div className='modal-inner'>
            <form onSubmit={handleSubmit}>
        <label>
          Department Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Type:
          <input type="text" name="type" value={formData.type} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Image:
          <input type="file" name="image" onChange={handleFileChange} required />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    
          </div>
         </div>
        }

       </main>
       </section>
  )
}

export default Departments
