import React, { useEffect, useState } from 'react'
import { FaHistory, FaNetworkWired, FaPlus, FaRegClock, FaRegUser, FaTimes, FaTrashAlt } from 'react-icons/fa'
import Nav from '../components/Nav'
import Sidenav from '../components/Sidenav'
import axios from 'axios'

const Tasks = () => {
    const [addtask, setAddTask] = useState(false);
    const [error, setError] = useState("");
    const [workData, setWorkData] = useState([]);
    const [workerData, setWorkerData] = useState([]);
    const [data, setData] = useState([]);
 //values of the inputs
  const[values, setValues] = useState({
    work: '',
    name: '',
    worker: '',
    submit: '',
})
const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };


   //submit Task function
   function handleSubmit(e){
    e.preventDefault()

    axios.post('/add_task', values)
    .then((res) => {
        console.log(res);
         
        fetchTask()
        setAddTask(false)

    })
    .catch((err) => {
        if (err.response && err.response.status === 400) {
            setError(err.response.data.error); // Set error message to display in the UI
        } else {
        console.error('An unexpected error occurred:', err);
        }
    })
}


//fetch work from database
useEffect(() => {
  
    axios.get('/work')
  .then((res) => {
    setWorkData(res.data)
  })
  .catch((err) => console.log(err))
  
  }, [])

  //fetch worker from database
useEffect(() => {
  
    axios.get('/worker')
  .then((res) => {
    setWorkerData(res.data)
  })
  .catch((err) => console.log(err))
  
  }, [])
 
  
//fetch tasks function
const fetchTask = () => {
    axios.get('/task')
  .then((res) => {
    setData(res.data)
  })
  .catch((err) => console.log(err))
}

//fetch tasks from database
useEffect(() => {
  fetchTask();
  }, [])


  //delete task
function handleDelete(id){
    axios.delete('/delete_task/'+id)
    .then((res) => {
       console.log("deleted");
       fetchTask();
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
            <p className='flex justify-between gap-2 items-center max-sm:gap-1'>Recent Tasks <FaHistory /></p>
            <div onClick={() => setAddTask(true)} className='px-5 py-3 max-sm:px-2 hover:bg-white bg-blue-200 flex items-center justify-between gap-2 rounded cursor-pointer'> 
              <FaPlus /> Add a Task
            </div>
          </div>

          <div className='w-full py-6 mt-16 px-10 max-sm:p-1'>
            <div className='grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:p-3 gap-3'>
            {data.map((task) => {
                return(
                <div className={`${task.status == "inprogress" && 'bg-yellow-100'} ${task.status == "failed" && 'bg-red-100'} ${task.status == "completed" ? 'bg-green-100' : 'bg-blue-100'} rounded-md px-5 py-2`}>
                    <div className='text-[12px]'>
                        <FaTrashAlt onClick={() => handleDelete(task.task_id)} className='text-red-700 cursor-pointer' />
                        <p className='float-right bg-purple-100'>{task.status}</p>
                    </div>
                    <h1 className={`${task.status == "inprogress" && 'text-yellow-900'} ${task.status == "failed" && 'text-red-900'} ${task.status == "completed" && 'text-green-900'} ${task.status == "not started" && 'text-blue-900'}`}>
                        {task.task_name}
                    </h1>
                    <p className='flex items-center gap-2'>
                        <div className='rounded-lg border-[1px] border-green-300 text-green-900 font-[500] px-2 py-1'>{task.work_ab}</div>
                        {task.work_name}
                    </p>
                    <p className='flex items-center gap-2'><FaRegUser />{task.worker_names}</p>
                    <p className={`${task.status == "inprogress" && 'text-yellow-900'} ${task.status == "failed" && 'text-red-900'} ${task.status == "completed" && 'text-green-900'} ${task.status == "not started" && 'text-blue-900'} flex items-center text-sm pt-3 gap-2`}>
                        <FaRegClock /> {task.submit_date}
                    </p>
                </div>
                )
            })}
            </div>
          </div>

          </div>
          </div>
          {addtask &&
          <div className='modal-cont'>
            <div className='modal-inner'>
              <form onSubmit={handleSubmit}>
                <div className='float-right icon' onClick={() => setAddTask(false)}>
                  <FaTimes/>
                </div>
                <h2 className='font-bold text-2xl mb-3 flex items-center gap-3'><FaNetworkWired /> Add a new Task</h2>
                <p>Work:</p>
                <select type='text' className='input' name='work' onChange={handleChange} required >
                    <option value="">Select a Work</option>
                    {workData.map((work) => {
                        return(
                            <option value={work.work_id}>{work.work_ab}</option>
                        )
                    })}
                </select>
                <p>Task name:</p>
                <input type='text' className='input' name='name' onChange={handleChange} required />
                <p>Worker:</p>
                <select type='text' className='input' name='worker' onChange={handleChange} required >
                    <option value="">Select a Worker</option>
                   {workerData.map((worker) => {
                        return(
                            <option value={worker.worker_id}>{worker.worker_names}</option>
                        )
                    })}
                </select>
                <p>Submit date:</p>
                <input type='date' className='input' name='submit' onChange={handleChange} required />
                <p className='text-red-500'>{error}</p>
                <button className='px-5 w-full py-3 max-sm:px-2 hover:bg-orange-200 bg-blue-200 flex items-center justify-center gap-2 rounded hover:border cursor-pointer'>
                 <FaPlus /> Add Task
                </button>
              </form>
            </div>
          </div>
          }
          </main>
          </section>
  )
}

export default Tasks
