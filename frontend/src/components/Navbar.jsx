import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import toastify from "../utils/alert";
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

    const [signinLoader, setSigninLoader] = useState(false);
    const { isUserAuthenticated, setIsUserAuthenticated } = useContext(AuthContext);

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


    const signinHandler = async () => {
        try {
            setSigninLoader(true);
            const response = await axiosInstance.post("/v1/user/signin");
            if (response?.status === 200) {
                localStorage.setItem("token", response?.data?.data?.token);
                localStorage.setItem("address", response?.data?.data?.address);
                setIsUserAuthenticated(response?.data?.data);
                toastify("success", "Signin Success.");
            }
            else {
                throw "Can't signin."
            }
        }
        catch (error) {
            toastify("error", error.message || "Something went wrong.")
            console.log(error.message);
        }
        finally {
            setSigninLoader(false)
        }
    }

    const signoutHandler = () => {
        try{
            setSigninLoader(true);
            setIsUserAuthenticated({});
            localStorage.removeItem("token");
            localStorage.removeItem("address");
        }
        catch(error){
            toastify("error", error.message || "Error in signing out.")
        }
        finally{
            setSigninLoader(false);
        }
    }

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

                    {
                        isUserAuthenticated?.address && isUserAuthenticated?.address ?
                            <li onClick={signoutHandler} className='flex items-center px-4 py-2 bg-white text-indigo-400 border-2 border-white cursor-pointer hover:bg-indigo-400 hover:text-white'>
                                {
                                    signinLoader ?
                                        <span className='animate-pulse'>Loading...</span>
                                        :
                                        <span>{isUserAuthenticated?.address}</span>
                                }
                            </li>
                            :
                            <li onClick={signinHandler} className='flex items-center px-4 py-2 bg-white text-indigo-400 border-2 border-white cursor-pointer hover:bg-indigo-400 hover:text-white'>
                                {
                                    signinLoader ?
                                        <span className='animate-pulse'>Loading...</span>
                                        :
                                        <span>Connect Wallet</span>
                                }
                            </li>
                    }



                </ul>

            </nav>
        </>
    )
}

export default Navbar