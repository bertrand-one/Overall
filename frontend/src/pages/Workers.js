import React, { useEffect, useState } from 'react'
import { FaListAlt, FaPeopleCarry, FaPlus, FaRegEdit, FaTimes, FaTrashAlt, FaUserEdit } from 'react-icons/fa'
import Nav from '../components/Nav'
import Sidenav from '../components/Sidenav'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Workers = () => {
    const [addworker, setAddworker] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] =useState([]);
    const [editdata, setEditdata] = useState(null);

    //values of the inputs
  const[values, setValues] = useState({
    names: '',
    email: '',
    telephone: '',
    national: '',
    job: '',
})

const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleChangeEdit = (event) => {
    const { name, value } = event.target;
    setEditdata({ ...editdata, [name]: value });
  };

    //submit worker function
  function handleSubmit(e){
    e.preventDefault()

    axios.post('/add_worker', values)
    .then((res) => {
        console.log(res);
         
        fetchWorkers()
        setAddworker(false)
        setError("")

    })
    .catch((err) => {
        if (err.response && err.response.status === 400) {
            setError(err.response.data.error); // Set error message to display in the UI
        } else {
        console.error('An unexpected error occurred:', err);
        }
    })
}




//fech worker function
const fetchWorkers = () => {
    axios.get('/worker')
    .then((res) => {
      setData(res.data)
    })
    .catch((err) => console.log(err))
  }
  
  //fetch worker from database
  useEffect(() => {
    
    fetchWorkers();
  
  }, [])


//delete work
function handleDelete(id){
    axios.delete('/delete_worker/'+id)
    .then((res) => {
       console.log("deleted");
       fetchWorkers();
    })
    .catch((err) => console.log(err))
  }
    
      //Edit worker function
      function handleEdit(e){
        e.preventDefault()
    
        axios.put('/edit_worker', editdata)
        .then((res) => {
            console.log(res);
             
            fetchWorkers()
            setEditdata(null)
    
        })
        .catch((err) => {
            if (err.response && err.response.status === 400) {
                setError(err.response.data.error); // Set error message to display in the UI
            } else {
            console.error('An unexpected error occurred:', err);
            }
        })
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
            <p className='flex justify-between gap-2 items-center max-sm:gap-1'>All workers <FaListAlt /></p>
            <div onClick={() => setAddworker(true)} className='px-5 py-3 max-sm:px-2 hover:bg-white bg-blue-200 flex items-center justify-between gap-2 rounded cursor-pointer'> 
              <FaPlus /> Add a Worker
            </div>
          </div>

          <div className='w-full py-6 mt-16 px-10 max-sm:p-1 grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:p-3 gap-2'>
            {data.map((worker) => {
                return(
                    <div className='max-sm:w-full hover:bg-white cursor-pointer border-2 border-indigo-200 rounded-lg break-words'>
                        <div className='flex justify-end gap-4 cursor-pointer bg-indigo-200 px-3 py-1'>
                            <FaRegEdit onClick={() => setEditdata(
                                {id: worker.worker_id,
                                names: worker.worker_names,
                                email: worker.worker_email,
                                tel: worker.worker_tel,
                                national: worker.worker_national_id,
                                job: worker.worker_job}
                                )} className='text-yellow-700' />
                            <FaTrashAlt className='text-red-400' onClick={() => handleDelete(worker.worker_id)} />
                        </div>
                        <Link to={'/worker/'+worker.worker_id}>
                        <div className='px-3 py-2'>
                        <h1>{worker.worker_names}</h1>
                        <p>email: {worker.worker_email}</p>
                        <p>Tel: {worker.worker_tel}</p>
                        <p>ID No: {worker.worker_national_id}</p>
                        <p className='font-semibold text-green-700'>{worker.worker_job}</p>
                        </div>
                        </Link>
                    </div>
                )
            })}
          
          </div>

          </div>
          </div>

          {addworker && 
          <div className='modal-cont'>
            <div className='modal-inner'>
              <form onSubmit={handleSubmit}>
                <div className='float-right icon' onClick={() => setAddworker(false)}>
                  <FaTimes/>
                </div>
                <h2 className='font-bold text-2xl mb-3 flex items-center gap-3'><FaPeopleCarry /> Add a new worker</h2>
                <p>Worker names:</p>
                <input type='text' className='input' name='names' onChange={handleChange} required />
                <p>Worker email:</p>
                <input type='text' className='input' name='email' onChange={handleChange} required />
                <p>Worker Telephone:</p>
                <input type='number' className='input' name='telephone' onChange={handleChange} required />
                <p>Worker national ID:</p>
                <input type='number' className='input' name='national' onChange={handleChange} required />
                <p>Worker Job:</p>
                <input type='text' className='input' name='job' onChange={handleChange} required />
                <p className='text-red-500'>{error}</p>
                <button className='px-5 w-full py-3 max-sm:px-2 hover:bg-orange-200 bg-blue-200 flex items-center justify-center gap-2 rounded hover:border cursor-pointer'>
                 <FaPlus /> Add worker
                </button>
              </form>
            </div>
          </div>
          }
          {editdata !== null && 
          <div className='modal-cont'>
            <div className='modal-inner'>
              <form onSubmit={handleEdit}>
                <div className='float-right icon' onClick={() => setEditdata(null)}>
                  <FaTimes/>
                </div>
                <h2 className='font-bold text-2xl mb-3 flex items-center gap-3'><FaUserEdit /> Edit worker</h2>
                <p>Worker names:</p>
                <input type='text' className='input' value={editdata.names} name='names' onChange={handleChangeEdit} />
                <p>Worker email:</p>
                <input type='text' className='input' value={editdata.email} name='email' onChange={handleChangeEdit} />
                <p>Worker Telephone:</p>
                <input type='number' className='input' value={editdata.tel} name='telephone' onChange={handleChangeEdit} />
                <p>Worker national ID:</p>
                <input type='number' className='input' value={editdata.national} name='national' onChange={handleChangeEdit} />
                <p>Worker Job:</p>
                <input type='text' className='input' value={editdata.job} name='job' onChange={handleChangeEdit} />
                <p className='text-red-500'>{error}</p>
                <button className='px-5 w-full py-3 max-sm:px-2 hover:bg-orange-200 bg-blue-200 flex items-center justify-center gap-2 rounded hover:border cursor-pointer'>
                 <FaPlus /> Edit worker
                </button>
              </form>
            </div>
          </div>
          }
          </main>
          </section>
  )
}

export default Workers
