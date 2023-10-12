// Login.js
import { useMetaMask } from "metamask-react";
import './Login.css';

function Login() {
    const { connect } = useMetaMask();

    const handleLogin = () => {
        connect();
    }

    return (
        <div>
            <button className="login-button" onClick={handleLogin}>Connect Wallet</button>
        </div>
    );
}

export default Login;
