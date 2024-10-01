import React from 'react'
import { Routes,Route,BrowserRouter } from 'react-router-dom'
import Works from './pages/Works'
import Work from './pages/Work'
import Tasks from './pages/Tasks'
import Workers from './pages/Workers'
import Worker from './pages/Worker'
import Departments from './pages/Departments'
import Home from './pages/Home'
import Login from './pages/Login'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
         <Route path='/works' element={<Works />}/>
         <Route path='/work/:id' element={<Work />}/>
         <Route path='/worker/:id' element={<Worker />}/>
         <Route path='/tasks' element={<Tasks />}/>
         <Route path='/workers' element={<Workers />}/>
         <Route path='/home' element={<Home />}/>
         <Route path='/' element={<Login />}/>
         <Route path="/departments" element={<Departments />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
