import Web3 from 'web3';
const SkillCheck = require('./SkillCheck.json'); // Use require to get the default export

const contractAddress = '0x0303fa521c87ac696E0F02099A48078EBEfEaC5d';

const web3 = new Web3(window.ethereum);

const skillCheckContract = new web3.eth.Contract(SkillCheck.abi, contractAddress);

async function issueCredential(skill, level) {
  if (!web3.currentProvider) {
    throw new Error("Please connect to an Ethereum wallet to use this feature.");
  }

  const accounts = await web3.eth.getAccounts();

  try {
    const transaction = await skillCheckContract.methods.issueCredential(skill, level).send({
      from: accounts[0],
    });
    return transaction;
  } catch (error) {
    throw new Error('Error issuing credential: ' + error.message);
  }
}

// Export the 'issueCredential' function
export { issueCredential };

// Add other contract interaction functions here
