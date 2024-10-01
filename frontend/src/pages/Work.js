import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaPlus, FaRegClock } from 'react-icons/fa'
import Sidenav from '../components/Sidenav'
import Nav from '../components/Nav'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const Work = () => {
  const [data, setData] = useState([]);
  const [taskdata, setTaskdata] = useState([]);
  const [percentage, setPercentage] = useState();
  const { id } = useParams();
  
  //fetch selected work
  useEffect(() => {
    axios.get('/get_work/'+id)
    .then((res) => {
      setData(res.data)
    })
    .catch((err) => console.log(err))
  }, [])
  
//fetch task of selected work
  useEffect(() => {
    axios.get('/get_task/'+id)
    .then((res) => {
      setTaskdata(res.data)
    })
    .catch((err) => console.log(err))
  }, [])

  if(data.length > 0 ){
    console.log("data are available"+data.length);
  }else{
    console.log("data are not available");
  }

  //get percantage of the wotk
  useEffect(() => {
    axios.get('/percentage/'+id)
    .then((res) => {
      setPercentage(res.data)
    })
    .catch((err) => console.log(err))
  }, [])

  return (
    <section className='w-full'>
      <div className='main'><div className='gradient' /></div>
      {data.map((work) => {
        return(
      <main className='app'>
        <Nav />
        <div className='flex items-start justify-between w-full h-[90vh]'>
          <Sidenav />
          <div>what?</div>
        <div className='w-[80%] mt-[10vh] z-30'>
        <div className='bg-white/30 border-b-2 border-t-2 z-30 fixed backdrop-blur-lg sub-nav py-2 px-10 w-full flex items-center justify-start gap-16 max-sm:gap-4 max-sm:px-5'>
            <Link to='/works' className='px-5 py-3 max-sm:px-2 hover:bg-white bg-blue-200 flex items-center justify-between gap-2 rounded cursor-pointer'> 
              <FaArrowLeft /> back
            </Link>
             <p className='flex justify-between gap-2 items-center max-sm:gap-1 max-sm:hidden'>{work.work_name}</p>
             <p className='hidden justify-between gap-2 items-center max-sm:gap-1 max-sm:flex'>{work.work_ab}</p>   
          </div>

          <div className='w-full py-6 mt-16 px-10 max-sm:p-1'>
            <div className='flex items-center justify-center w-full max-md:flex-col max-sm:px-5'>
              <div className='pb-10 w-full text-center'>
                 <h1 className='bg-gradient-to-b from-green-200 via-green-100 text-blue-900 text-center py-5'>{work.work_name} Details</h1>
                 <p className='text-lg'>This project is made for <span className='text-green-900 font-semibold'>{work.client}</span></p>
                 <p className='text-lg'>{work.work_desc}</p>
                 <p className='text-lg'>This project was initiated at <span className='text-green-900 font-semibold'>{work.start_date}</span></p>
                 <p className='text-lg'>To be finished at <span className='text-red-900 font-semibold'>{work.start_date}</span></p>
                 <p className='text-lg'>Technologies that are to be used: <span className='font-semibold'>{work.technologies}</span></p>
              </div>
              <div className='w-full bg-white border max-h-[300px] flex-3'>
              <h1 className='px-10 py-2'> Tasks of the project</h1>
              <div className='max-h-[250px] overflow-y-scroll p-3'>
                {taskdata == "" ? <p>No Tasks Found!</p> :
                taskdata.map((task) => {
                  return(
                    <div className={`${task.status == "inprogress" && 'bg-yellow-100'} ${task.status == "failed" && 'bg-red-100'} ${task.status == "completed" && 'bg-green-100'} ${task.status == "not started" && 'bg-blue-100'} gap-2 relative pb-3 px-3 mb-3 rounded-md`}>
                    <div className='flex items-center justify-between gap-2'>
                    <h1>{task.task_name}</h1>
                    <p>{task.worker_names}</p>
                    </div><div className='flex items-center justify-between gap-2'>
                    <p className='text-[12px] flex items-center gap-2'><FaRegClock /> {task.submit_date}</p>
                    <p className='text-[12px]'>{task.status}</p>
                    </div>
                    </div>
                  )
                })}
                  
                </div>
              </div>
            </div>
            
            <div className='mt-5 max-md:flex'>
              <div className='flex max-md:flex-col w-[92%] max-md:h-[92vh] px-3 max-md:px-0 max-md:w-full'>
                {taskdata.map((task, index) => {
                  if(index%2 == 0){
                    return(
                    <div className='flex md:flex-col items-center justify-end mr-1 max-md:mr-0 max-md:mb-1'>
                      <div className='border-4 border-blue-300 rounded-full p-2 w-full bg-orange-100 text-orange-900 font-semibold'>{index}.{task.task_name}</div>
                      <div className='h-10 w-1 max-md:h-1 max-md:w-10 bg-blue-300'></div>
                    </div>
                    )
                  }
                })}
              </div>

              {taskdata.length > 0 &&
              <div className='w-full border-4 border-blue-300 bg-blue-200 rounded h-7 max-md:h-[90vh] max-md:w-7'>
                 <div className={`h-full w-[${percentage}%] max-md:h-[${percentage}%] max-md:w-full text-blue-700 font-bold flex items-center justify-center bg-blue-300`}>{percentage}%</div>
              </div>
               }

              <div className='flex max-md:flex-col w-[92%] max-md:h-[92vh] max-md:mt-[5vh] float-right px-3 mb-8 max-md:px-0 max-md:w-full'>
              {taskdata.map((task, index) => {
                  if(index%2 !== 0){
                    return(
                    <div className='flex md:flex-col items-center justify-center mr-1 max-md:mr-0 max-md:mb-1'>
                      <div className='h-10 w-1 max-md:h-1 max-md:w-10 bg-blue-300'></div>
                      <div className='border-4 border-blue-300 rounded-full p-2 w-full bg-orange-100 text-orange-900 font-semibold'>{index}.{task.task_name}</div>
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
            })   
            }
          </section>
  )
}

export default Work
