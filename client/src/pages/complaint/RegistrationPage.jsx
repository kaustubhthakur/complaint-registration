import React, { useState } from 'react';
import Web3 from 'web3';
import "./Registration.css"
const ComplaintContract =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_complaint",
				"type": "string"
			}
		],
		"name": "Register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "complaint",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "resolved",
				"type": "bool"
			}
		],
		"name": "registeredComplaint",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "Resolve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "resolved",
				"type": "bool"
			}
		],
		"name": "resolvedComplaint",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "activecomplaints",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "complaints",
		"outputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "complaint",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "resolved",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllComplaints",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "complaint",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "resolved",
						"type": "bool"
					}
				],
				"internalType": "struct ComplaintRegistration.Complaint[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getcomplaint",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "resolvedcomplaints",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalcomplaints",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const web3 = new Web3(Web3.givenProvider);
const contractAddress = '0x982646981b2db18f9e333b8885ed3a6cbde5a5bc'; // Replace with your contract address

function RegisterationPage() {
  const [complaint, setComplaint] = useState('');
  const [error, setError] = useState('');

  async function registerComplaint() {
    try {
        const provider = window.ethereum || window.web3.currentProvider;
        if (!provider) {
          throw new Error('Web3 provider not available. Please install MetaMask.');
        }
        const web3 = new Web3(provider);
      const accounts = await web3.eth.requestAccounts();
      const contract = new web3.eth.Contract(ComplaintContract, contractAddress);
      await contract.methods.Register(complaint).send({ from: accounts[0] });
      console.log('Complaint registered successfully');
    } catch (error) {
      console.error('Error registering complaint:', error);
      setError(error.message || error);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!complaint) {
      setError('Please provide a complaint.');
      return;
    }
    registerComplaint();
  }

  return (
    <div>
      <h2>Register Complaint</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="complaint">Complaint:</label>
          <input
            type="text"
            id="complaint"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default RegisterationPage;
