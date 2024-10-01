import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Sidenav from '../components/Sidenav'
import { FaBoxes, FaListAlt, FaPlus, FaTimes } from 'react-icons/fa'
import axios from 'axios'

const Departments = () => {
  const [data, setData] = useState([])
  const [add, setAdd] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);

  // Form values
  const [values, setValues] = useState({
    names: '',
    type: '',
  });

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  // Handle image selection
  const handleImageChange = (event) => {
    setImage(event.target.files[0]); // Save the selected image file in state
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append('names', values.names);
    formData.append('type', values.type);
    formData.append('image', image); // Append the image file

    // Send the data to the server
    axios.post('/add_department', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Required for file uploads
      },
    })
    .then((res) => {
      console.log(res.data.message);
      setAdd(false);
      // Call a function to refresh the department list (e.g., fetchDepartment())
    })
    .catch((err) => {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.error); // Set error message to display in the UI
      } else {
        console.error('An unexpected error occurred:', err);
        setError('An unexpected error occurred. Please try again later.');
      }
    });
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
              <div className='float-right icon' onClick={() => setAdd(false)}>
                <FaTimes/>
              </div>
              <h2 className='font-bold text-2xl mb-3 flex items-center gap-3'><FaBoxes /> new Department</h2>
              
              
              <p>Department name:</p>
              <input type='text' className='input' name='names' onChange={handleChange} required />
              <p>Department type:</p>
              <input type='text' className='input' name='type' onChange={handleChange} required />
              <p>Department cover</p>
              <input type="file" name="image" onChange={handleImageChange} />
            
              
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <button className='px-5 w-full py-3 max-sm:px-2 hover:bg-orange-200 bg-blue-200 flex items-center justify-center gap-2 rounded hover:border cursor-pointer'>
                 <FaPlus /> Add Department
              </button>
            </form>
          </div>
         </div>
        }

       </main>
       </section>
  )
}

export default Departments
