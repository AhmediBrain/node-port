import React from 'react'
import DashboardSidebar from '../dashboard/DashboardSidebar';
import DashboardNavbar from '../dashboard/DashboardNavbar';
import UserProfileTable from './UserProfileTable';

const UsersProfile = () => {
  return (
    <div className='user_profile'>
      <DashboardSidebar />
      <div className='profile_container'>
        <DashboardNavbar />
        <UserProfileTable />
      </div>
    </div>
  )
}

export default UsersProfile