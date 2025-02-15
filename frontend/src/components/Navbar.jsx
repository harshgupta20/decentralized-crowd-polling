import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {

    const MENU_OPTION = [
        {
            name: "Add Task",
            route: "/user/add-task",
            callBackFunction: () => { console.log("Callback function called."); }
        },
        {
            name: "View Task",
            route: "/user/view-tasks",
            callBackFunction: () => { console.log("Callback function called."); }
        }
    ]

    return (
        <>
            <nav className='bg-indigo-400 text-white py-4 px-6 flex justify-between items-center'>
                <p className='text-lg'>Crowd Polling</p>

                <ul className='flex gap-3'>
                    {
                        MENU_OPTION?.map((option, key) => {
                            return (
                                <li key={key} className='px-4 py-2 bg-white text-indigo-400 border-2 border-white cursor-pointer hover:bg-indigo-400 hover:text-white'>
                                    <Link to={option?.route}>
                                        {option?.name}
                                    </Link>
                                </li>
                            )
                        })
                    }
                    <li className='px-4 py-2 bg-white text-indigo-400 border-2 border-white cursor-pointer hover:bg-indigo-400 hover:text-white'>Connect Wallet</li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar