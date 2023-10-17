import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import VerificationPage from './pages/VerificationPage';
import { useMetaMask } from "metamask-react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  return (
    <BrowserRouter>
      {status === "initializing" && <div>Synchronisation with MetaMask ongoing...</div>}

      {status === "unavailable" && <div>MetaMask not available.</div>}

      {status === "notConnected" && (
        <div>
          <button onClick={connect}>Connect to MetaMask</button>
        </div>
      )}

      {status === "connecting" && <div>Connecting...</div>}

      {status === "connected" && (
        <div>
          Connected account  on chain ID {chainId}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/UserDashboard" element={<UserDashboard />} />
            <Route path="/VerificationPage" element={<VerificationPage />} />
                        <Route path="/VerificationPage" element={<VerificationPage />} />

          </Routes>
        </div>
      )}
      
    </BrowserRouter>
  );
}

export default App;
