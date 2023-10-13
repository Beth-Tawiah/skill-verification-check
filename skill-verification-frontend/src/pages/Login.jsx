import React from 'react';
import { useMetaMask } from 'metamask-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import './Login.css';

function Login() {
  const { connect, status } = useMetaMask();
  const navigate = useNavigate(); // Get the navigate function from React Router

  const handleLogin = async () => {
    await connect();
    if (status === 'connected') {
      // Navigate to the UserDashboard page if connected
      navigate('/UserDashboard');
    }
  };

  return (
    <div>
      <button className="login-button" onClick={handleLogin}>
        Log In
      </button>
    </div>
  );
}

export default Login;
