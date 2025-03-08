import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTask from './pages/user/AddTask';
import ViewTasks from './pages/user/ViewTasks';
import Home from './pages/Home';
import { AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/NotFound';
import VoteTask from './pages/worker/VoteTask';


import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

const App = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState({});


  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const address = localStorage.getItem("address");
    if (token) {
      setIsUserAuthenticated({ address, token });
    }
  }, []);

  return (
    <>
      <Router>
        <AuthContext.Provider value={{ isUserAuthenticated, setIsUserAuthenticated }}>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                <Navbar />
                <Routes>
                  <Route element={<Home />} path="/" />
                  {/* Protected routes */}
                  <Route element={<ProtectedRoute element={<AddTask />} />} path="/user/add-task" />
                  <Route element={<ProtectedRoute element={<ViewTasks />} />} path="/user/view-tasks" />


                  <Route element={<ProtectedRoute element={<VoteTask />} />} path="/worker/vote" />
                  <Route element={<NotFound />} path="*" />
                </Routes>


                <ToastContainer />
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </AuthContext.Provider>

      </Router>
    </>
  );
};

export default App;
