import React from 'react'
import { tableTitle } from '../../json-data/formsData'

const UsersAllTable = () => {
  return (
    <div className='users_table_container'>
        <table>
            <thead>
                <tr>
                    {tableTitle.map((item) => {
                        return(
                            <td key={item.id}>
                                {item.title}
                            </td>
                        )
                    })}
                </tr>                
            </thead>
        </table>
    </div>
  )
}

export default UsersAllTable