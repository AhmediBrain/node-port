import React from 'react'
import DashboardSidebar from './DashboardSidebar'
import DashboardNavbar from './DashboardNavbar'
import Widget from '../widget/Widget'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <DashboardSidebar />
      <div className='dashboard_container'>
        <DashboardNavbar />
        <div className='widgets'>
          <Widget type="user" />
          <Widget type="product" />
          <Widget type="order" />
          <Widget type="earning" />
        </div>
      </div>
    </div>
  )
}

export default Dashboard