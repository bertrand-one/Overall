import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Sidenav from '../components/Sidenav'
import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import axios from 'axios'

const Worker = () => {
    const [data, setData] = useState([])
    const [taskdata, setTaskdata] = useState([])
    const { id } = useParams();
  
  //fetch selected worker
  useEffect(() => {
    axios.get('/get_worker/'+id)
    .then((res) => {
      setData(res.data)
    })
    .catch((err) => console.log(err))
  }, [])

  //fetch task of selected worker
  useEffect(() => {
    axios.get('/fetch_task/'+id)
    .then((res) => {
      setTaskdata(res.data)
    })
    .catch((err) => console.log(err))
  }, [])

  return (
    <section className='w-full'>
      <div className='main'><div className='gradient' /></div>
      {data.map((worker) => {
                return(
      <main className='app'>
        <Nav />
        <div className='flex items-start justify-between w-full h-[90vh]'>
          <Sidenav />
          <div>what?</div>
        <div className='w-[80%] mt-[10vh] z-30'>
        <div className='bg-white/30 border-b-2 border-t-2 z-30 fixed backdrop-blur-lg sub-nav py-2 px-10 w-full flex items-center justify-start gap-16 max-sm:gap-4 max-sm:px-5'>
            <Link to='/workers' className='px-5 py-3 max-sm:px-2 hover:bg-white bg-blue-200 flex items-center justify-between gap-2 rounded cursor-pointer'> 
              <FaArrowLeft /> back
            </Link>
             <p className='flex justify-between gap-2 items-center max-sm:gap-1'>{worker.worker_names}</p> 
          </div>

          <div className='w-full py-6 mt-16 px-10 max-sm:p-1'>
            <h1 className='text-center text-blue-900 bg-gradient-to-b from-blue-200 via-blue-100 py-5'>{worker.worker_job}</h1>
            <div className='grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1'>
                 <div className='border-r-2 w-full px-2'>
                    <h1 className='border-b-2 max-sm:border-0 flex items-center gap-2 border-blue-500 pb-3'><div className="w-3 h-3 rounded-full bg-blue-300 sm:hidden"></div>To do tasks</h1>
                    {taskdata.map((task) => {
                        if(task.status == 'not started'){
                            return(
                                <div className='py-3 border-b-2 pr-3'>
                                    <p className='text-[12px]'>{task.submit_date}</p>
                                    <h2 className='font-semibold'>{task.task_name}</h2>
                                    <p>{task.work_name}</p>
                                </div>
                            )
                        }
                    })}
                 </div>
                 <div className='border-r-2 w-full px-2'>
                    <h1 className='border-b-2 max-sm:border-0 flex items-center gap-2 border-red-500 pb-3'><div className="w-3 h-3 rounded-full bg-red-300 sm:hidden"></div>Failed tasks</h1>
                    {taskdata.map((task) => {
                        if(task.status == 'failed'){
                            return(
                                <div className='py-3 border-b-2 pr-3'>
                                    <p className='text-[12px]'>{task.submit_date}</p>
                                    <h2 className='font-semibold'>{task.task_name}</h2>
                                    <p>{task.work_name}</p>
                                </div>
                            )
                        }
                    })}
                 </div>
                 <div className='border-r-2 w-full px-2'>
                   <h1 className='border-b-2 max-sm:border-0 flex items-center gap-2 border-yellow-500 pb-3 max-sm:mt-5'><div className="w-3 h-3 rounded-full bg-yellow-300 sm:hidden"></div>In progress tasks</h1>
                   {taskdata.map((task) => {
                        if(task.status == 'inprogress'){
                            return(
                                <div className='py-3 border-b-2 pr-3'>
                                    <p className='text-[12px]'>{task.submit_date}</p>
                                    <h2 className='font-semibold'>{task.task_name}</h2>
                                    <p>{task.work_name}</p>
                                </div>
                            )
                        }
                    })}
                 </div>
                 <div className='w-full px-2'>
                   <h1 className='border-b-2 max-sm:border-0 flex items-center gap-2 border-green-500 pb-3 max-sm:mt-5'><div className="w-3 h-3 rounded-full bg-green-300 sm:hidden"></div>Accomplished tasks</h1>
                   {taskdata.map((task) => {
                        if(task.status == 'completed'){
                            return(
                                <div className='py-3 border-b-2 pr-3'>
                                    <p className='text-[12px]'>{task.submit_date}</p>
                                    <h2 className='font-semibold'>{task.task_name}</h2>
                                    <p>{task.work_name}</p>
                                </div>
                            )
                        }
                    })}
                 </div>
          </div>
          </div>
            </div>
            </div>
            </main>
              )
            })}
            </section>
  )
}

export default Worker
