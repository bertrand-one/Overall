import React from 'react'
import Nav from '../components/Nav'
import Sidenav from '../components/Sidenav'

const Home = () => {
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
             <p className='flex px-5 py-3 justify-between gap-2 items-center max-sm:gap-1'>Dashboard</p>  
          </div>

          <div className='w-full py-6 mt-16 px-10 max-sm:p-1'>
            hello
          </div>

          </div>
          </div>
          </main>
          </section>
  )
}

export default Home
