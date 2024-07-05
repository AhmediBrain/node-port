import React from 'react'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

const Widget = ({ type }) => {
    let data = {
        title: '',
        link: '',
        query: '',
        icon: ''
    }

    switch(type) {
        case 'user': 
            data={
                title: 'USERS',
                link: 'See all users',
                query: 'users',
                icon: <PersonOutlinedIcon sx={{ fontSize: '18px', color: '#7568a5' }} />
            }
        break;
        case 'product':
            data={
                title: 'PRODUCTS',
                link: 'See all products',
                query: 'products',
                icon: <AccountBalanceWalletOutlinedIcon sx={{ fontSize: '18px', color: '#7568a5' }} />
            }
        break;
        case 'order':
            data={
                title: 'ORDERS',
                link: 'See all orders',
                query: 'orders',
                icon: <ShoppingCartOutlinedIcon sx={{ fontSize: '18px', color: '#7568a5' }} />
            }
        break;
        case 'earning':
            data={
                title: 'EARNINGS',
                link: 'View net earning',
                query: 'earnings',
                icon: <MonetizationOnOutlinedIcon sx={{ fontSize: '18px', color: '#7568a5' }} />
            }
        break;
        default:
            break;
    }
    return (
        <div className='widget_container'>
            <div className='left'>
                <span className='widget_title'>
                    {data.title}
                </span>
                <span className='widget_link'>
                    {data.link}
                </span>
            </div>
            <div className='right'>
                <span>{data.icon}</span>
            </div>
        </div>
    )
}

export default Widget