import React, { useState } from 'react'
import { FaBoxes, FaBriefcase, FaHome, FaNetworkWired, FaPeopleCarry } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidenav = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();


  const links = [
    { name: 'Home', to: '/home', icon: <FaHome />, color: 'bg-blue-200 border-blue-300' },
    { name: 'Works', to: '/works', icon: <FaBriefcase />, color: 'bg-green-200 border-green-300' },
    { name: 'Tasks', to: '/tasks', icon: <FaNetworkWired />, color: 'bg-orange-200 border-orange-300' },
    { name: 'Workers', to: '/workers', icon: <FaPeopleCarry />, color: 'bg-purple-200 border-purple-300' },
    { name: 'Departments', to: '/departments', icon: <FaBoxes />, color: 'bg-red-200 border-red-300' },
  ];

  React.useEffect(() => {
    const currentIndex = links.findIndex(link => link.to === location.pathname);
    setActiveIndex(currentIndex);
  }, [location.pathname]);

  return (
    <div className='sidenav top-[10vh] border border-2 fixed w-[20%] h-full py-10 px-5 max-sm:px-3'>
      {links.map((link, index) => (
      <Link key={index} to={link.to} className={`${activeIndex === index ? 'bg-white border-2' : 'hover:bg-gray-200'} mb-1 flex max-lg:flex-col justify-start items-center rounded-xl px-10 py-2 gap-4 max-lg:gap-2 max-lg:px-0 max-lg:justify-center cursor-pointer`}>
        <div className={`${link.color} p-4 border-[1px] rounded-xl`}>
          {link.icon} 
        </div>
        <p>{link.name}</p>
      </Link>
      ))}
    </div>
  )
}

export default Sidenav
