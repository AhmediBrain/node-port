import React from 'react'
import DashboardSidebar from '../dashboard/DashboardSidebar'
import DashboardNavbar from '../dashboard/DashboardNavbar'
import NetsPlayerAverageTable from './NetsPlayerAverageTable'

const NetsPlayerViewComponent = () => {
    // const 
    return (
        <div className='user_list'>
            <DashboardSidebar />
            <div className='user_list_container'>
                <DashboardNavbar />
                <NetsPlayerAverageTable />
            </div>
        </div>
    )
}

export default NetsPlayerViewComponent