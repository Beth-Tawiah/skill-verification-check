import React from 'react';
import { useMetaMask } from 'metamask-react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const { connect, status } = useMetaMask();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await connect();
    if (status === 'connected') {
      navigate('/UserDashboard');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please log in to continue</p>

        <button className="login-button" onClick={handleLogin}>
          Log In with MetaMask
        </button>

        {status === 'not-connected' && (
          <p className="login-status">Connect your MetaMask wallet to get started.</p>
        )}
      </div>
    </div>
  );
}

export default Login;
