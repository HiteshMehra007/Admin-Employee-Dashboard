import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

const Navbar = () => {
  const { logout, username } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
      <nav className="navbar bg-[#FFEB55]">
        <div className='flex justify-between items-center mx-auto max-w-[80%] p-1 text-[#640D5F]'>
            <div className="navbar-left flex items-center gap-16">
                <Link to="/" className='mr-5 text-lg'>Home</Link>
                <Link to="employeelist" className='mr-5 text-lg'>Employee List</Link>
            </div>
            <div className="navbar-right flex items-center text-lg">
                <span>{username}-</span>
                <button onClick={handleLogout} className="logout-button bg-[#f44336] text-white border-none pt-2 pb-2 pr-4 pl-4 m-5 rounded-md text-lg">Logout</button>
            </div>
        </div>
      </nav>
  )
}

export default Navbar