import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import logoUser from '../../../../assets/images/3.png';


export default function SideBar() {
const [collapsed, setCollapsed] = useState(false);

const toggelColapsed=()=>{
  setCollapsed(!collapsed)
}
const navigate=useNavigate()
  const logout=()=>{
    localStorage.removeItem('token');
    navigate('/login')


  }
  return (
    <>
    <div className='sidebar-container mt-1'>
      <Sidebar collapsed={collapsed}>
        
        <div className='d-flex justify-content-start ms-2 mt-3'>
          <button onClick={toggelColapsed} className=" border-0 fs-4 bg-transparent text-white">
        {collapsed ? <FaTimes /> : <FaBars />}
      </button>
        </div>
        <div className='d-flex justify-content-center '>
           <img className=' img-fluid ' src={logoUser} alt="logoUser" />
        </div>
        <Menu>
          
          <MenuItem  className='text-white fs-6 '   icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
          <MenuItem  className='text-white fs-6 '  icon={<i className="fa-solid fa-users"></i>} component={<Link to="/dashboard/users" />}> Users </MenuItem>
          <MenuItem  className='text-white fs-6 '  icon={<i className="fa-solid fa-receipt"></i>} component={<Link to="/dashboard/recipes" />}> Recipes </MenuItem>
          <MenuItem  className='text-white fs-6 '  icon={<i className="fa-solid fa-layer-group"></i>} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>
          <MenuItem  className='text-white fs-6 '  icon={<i className="fa-solid fa-heart"></i>} component={<Link to="/dashboard/favorites" />}> Favorites </MenuItem>
          <MenuItem  className='text-white fs-6 '  icon={<i className="fa-solid fa-unlock-keyhole"></i>} > Change Password </MenuItem>
          <MenuItem  className='text-white fs-6 '  icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>} > <span className='bg-tr' onClick={logout}> logout</span> </MenuItem>
        </Menu>
      
      </Sidebar>;

    </div>
    </>
  )
}
