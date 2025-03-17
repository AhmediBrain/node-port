import React from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

const DashboardSidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar_top'>
        <Link to="/">
          <span className='sidebar_top_logo'>
            Portfolio
          </span>
        </Link>
      </div>
      <hr />
      <div className='sidebar_center'>
        <ul>
          <p className='title'>
            Main
          </p>
          <Link to='/dashboard'>
            <li>
              <DashboardIcon sx={{ fontSize: '18px', color: '#6439ff' }} />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className='title'>
            Lists
          </p>
          <Link to='/users'>
            <li>
              <PersonOutlineOutlinedIcon sx={{ fontSize: '18px', color: '#6439ff' }} />
              <span>Users</span>
            </li>
          </Link>
          <Link to='/nets'>
            <li>
              <SportsBasketballIcon sx={{ fontSize: '18px', color: '#E75929', backgroundColor: '#000000', borderRadius: '50%' }} />
              <span>Nets</span>
            </li>
          </Link>
          <Link to='/products'>
            <li>
              <QrCodeOutlinedIcon sx={{ fontSize: '18px', color: '#6439ff' }} />
              <span>Products</span>
            </li>
          </Link>
          <Link to='/orders'>
            <li>
              <BorderStyleIcon sx={{ fontSize: '18px', color: '#6439FF' }} />
              <span>Orders</span>
            </li>
          </Link>
          <Link to='/delivery'>
            <li>
              <DeliveryDiningOutlinedIcon sx={{ fontSize: '18px', color: '#6439FF' }} />
              <span>Delivery</span>
            </li>
          </Link>
          <p className='title'>USER</p>
          <Link to='/profile'>
            <li>
              <AccountCircleOutlinedIcon sx={{ fontSize: '18px', color: '#6439FF' }} />
              <span>Profile</span>
            </li>
          </Link>
          <Link to='/login'>
            <li>
              <LockOutlinedIcon sx={{ fontSize: '18px', color: '#6439FF' }} />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default DashboardSidebar