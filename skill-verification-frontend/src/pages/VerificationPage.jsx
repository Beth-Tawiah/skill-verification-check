import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { verifyCredential } from './blockchain.js';


const VerificationPage = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          setWeb3(web3Instance);
          const accounts = await web3Instance.eth.getAccounts();
          setAccounts(accounts);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = verifyCredential.networks[networkId];
          const skillCheckInstance = new web3Instance.eth.Contract(
            verifyCredential.abi,
            deployedNetwork && deployedNetwork.address
          );
          setContract(skillCheckInstance);
        } catch (error) {
          console.error('User denied account access or error while initializing web3.');
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        const web3Instance = new Web3(window.web3.currentProvider);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAccounts(accounts);
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = verifyCredential.networks[networkId];
        const skillCheckInstance = new web3Instance.eth.Contract(
          verifyCredential.abi,
          deployedNetwork && deployedNetwork.address
        );
        setContract(skillCheckInstance);
      }
      // Non-dapp browsers...
      else {
        console.log('No web3 detected. Falling back to non-dapp behavior.');
      }
    };

    initWeb3();
  }, []);

  const handleVerify = async (owner, credentialIndex) => {
    try {
      await contract.methods.verifyCredential(owner, credentialIndex).send({ from: accounts[0] });
      console.log('Credential verified successfully');
      // Refresh the credentials list after verification
      await loadCredentials();
    } catch (error) {
      console.error('Error while verifying credential:', error);
    }
  };

  const loadCredentials = async () => {
    try {
      const owner = accounts[0];
  
      // Check if the contract is not null before using it
      if (contract) {
        const credentialsCount = await contract.methods.getCredentialsCount(owner).call();
        const credentials = [];
  
        for (let i = 0; i < credentialsCount; i++) {
          const credential = await contract.methods.getCredential(owner, i).call();
          credentials.push(credential);
        }
  
        setCredentials(credentials);
      } else {
        console.error('Smart contract not initialized');
      }
    } catch (error) {
      console.error('Error while loading credentials:', error);
    }
  };

  return (
    <div>
      <h2>Verification Page</h2>
      <p>Connected Account: {accounts[0]}</p>
      <button onClick={loadCredentials}>Load Credentials</button>
      <ul>
        {credentials.map((credential, index) => (
          <li key={index}>
            Skill: {credential.skill}, Level: {credential.level}, Status: {credential.status}
            {credential.status === 'Pending' && (
              <button onClick={() => handleVerify(accounts[0], index)}>Verify</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerificationPage;
