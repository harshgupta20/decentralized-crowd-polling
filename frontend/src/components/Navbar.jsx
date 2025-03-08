import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import toastAlert from "../utils/alert";
import { AuthContext } from '../context/AuthContext';
import SigninOptionModal from './SignInOptionModal';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

const Navbar = () => {
    const [signinLoader, setSigninLoader] = useState(false);
    const { isUserAuthenticated, setIsUserAuthenticated } = useContext(AuthContext);

    const { publicKey, signMessage } = useWallet();

    const [showAuthOptionModal, setShowAuthOptionModal] = useState(false);

    const MENU_OPTION = [
        {
            name: "Add Task",
            route: "/user/add-task",
            callBackFunction: () => { console.log("Callback function called."); },
            protectedRoute: true
        },
        {
            name: "View Task",
            route: "/user/view-tasks",
            callBackFunction: () => { console.log("Callback function called."); },
            protectedRoute: true
        },
        {
            name: "Vote Task",
            route: "/worker/vote",
            callBackFunction: () => { console.log("Callback function called."); },
            protectedRoute: true
        }
    ];

    const signinHandler = async () => {
        try {
            setShowAuthOptionModal(true);
            // setSigninLoader(true);
            // const response = await axiosInstance.post("/v1/user/signin");
            // if (response?.status === 200) {
            //     localStorage.setItem("token", response?.data?.data?.token);
            //     localStorage.setItem("address", response?.data?.data?.address);
            //     setIsUserAuthenticated(response?.data?.data);
            //     toastAlert("success", "Signin Success.");
            // } else {
            //     throw "Can't signin.";
            // }
        } catch (error) {
            toastAlert("error", error.message || "Something went wrong.");
            console.log(error.message);
        } finally {
            setSigninLoader(false);
        }
    };

    const signoutHandler = () => {
        try {
            setSigninLoader(true);
            setIsUserAuthenticated({});
            localStorage.removeItem("token");
            localStorage.removeItem("address");
            toastAlert("success", "Signout Success.");
        } catch (error) {
            toastAlert("error", error.message || "Error in signing out.");
        } finally {
            setSigninLoader(false);
        }
    };

    const signMesageWithWallet = async () => {
        try {
            const message = new TextEncoder().encode("Sign in with Decentralized Crowd Polling.");
            const signature = await signMessage(message);
            console.log("Signature ===>", signature)

            const response = await axiosInstance.post("/v1/user/signin", {
                publicKey, signature
            });

            localStorage.setItem("token", response?.data?.data?.token);
            localStorage.setItem("address", response?.data?.data?.address);
            setIsUserAuthenticated(response?.data?.data);
            toastAlert("success", "Signin Success.");
        }
        catch (error) {
            console.log("Error -->", error?.message || "Something went wrong.")
        }
    }

    return (
        <nav className="bg-indigo-500 text-white py-4 px-6 shadow-md flex justify-between items-center">
            <Link to="/">
                <p className="text-2xl font-semibold text-white">Crowd Polling</p>
            </Link>

            <ul className="flex gap-4">
                {MENU_OPTION.map((option, key) => {
                    // if(isUserAuthenticated.token && option.protectedRoute){

                    // }

                    return (option?.protectedRoute ?
                        (isUserAuthenticated?.address &&
                            <li
                                key={key}
                                className="px-4 py-2 bg-white text-indigo-500 border-2 border-white cursor-pointer rounded-lg transition-all duration-300 hover:bg-indigo-400 hover:text-white"
                            >
                                <Link to={option?.route}>{option?.name}</Link>
                            </li>
                        )
                        :
                        <li
                            key={key}
                            className="px-4 py-2 bg-white text-indigo-500 border-2 border-white cursor-pointer rounded-lg transition-all duration-300 hover:bg-indigo-400 hover:text-white"
                        >
                            <Link to={option?.route}>{option?.name}</Link>
                        </li>
                    )

                    // return (
                    //     <li
                    //         key={key}
                    //         className="px-4 py-2 bg-white text-indigo-500 border-2 border-white cursor-pointer rounded-lg transition-all duration-300 hover:bg-indigo-400 hover:text-white"
                    //     >
                    //         <Link to={option?.route}>{option?.name}</Link>
                    //     </li>
                    // );
                })}

                {/* {isUserAuthenticated?.address ? (
                    <li
                        onClick={signoutHandler}
                        className="flex items-center px-4 py-2 bg-white text-indigo-500 border-2 border-white cursor-pointer rounded-lg transition-all duration-300 hover:bg-indigo-400 hover:text-white"
                    >
                        {signinLoader ? (
                            <span className="animate-pulse">Loading...</span>
                        ) : (
                            <span>{isUserAuthenticated?.address}</span>
                        )}
                    </li>
                ) : (
                    <li
                        onClick={signinHandler}
                        className="flex items-center px-4 py-2 bg-white text-indigo-500 border-2 border-white cursor-pointer rounded-lg transition-all duration-300 hover:bg-indigo-400 hover:text-white"
                    >
                        {signinLoader ? (
                            <span className="animate-pulse">Loading...</span>
                        ) : (
                            <span>Connect Wallet</span>
                        )}
                    </li>
                )} */}

                {
                    publicKey ?
                        <WalletDisconnectButton />
                        :
                        <WalletMultiButton />
                }
                {
                    (publicKey && !isUserAuthenticated?.address) && <button onClick={signMesageWithWallet}>Authenticate Account</button>
                }
                {
                    isUserAuthenticated?.address && <button disabled>Authenticated 👌</button>
                }
            </ul>

            <SigninOptionModal open={showAuthOptionModal} setOpen={setShowAuthOptionModal} />
        </nav>
    );
};

export default Navbar;
