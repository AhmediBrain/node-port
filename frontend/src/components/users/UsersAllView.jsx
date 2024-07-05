import React from 'react'
import DashboardSidebar from '../dashboard/DashboardSidebar'
import DashboardNavbar from '../dashboard/DashboardNavbar'
import UsersAllTable from './UsersAllTable'

const UsersAllView = () => {
  return (
    <div className='user_list'>
        <DashboardSidebar />
        <div className='user_list_container'>
            <DashboardNavbar />
            <UsersAllTable />
        </div>
    </div>
  )
}

export default UsersAllView