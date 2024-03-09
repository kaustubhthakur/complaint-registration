// ResolveComplaint.js
import React, { useState } from 'react';
import Web3 from 'web3';
import "./Resolve.css"
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

function ResolvePage() {
  const [complaintId, setComplaintId] = useState('');
  const [error, setError] = useState('');

  const handleResolve = async () => {
    try {
      if (!complaintId) throw new Error('Please provide a complaint ID');
      
      // Check if MetaMask is installed
      if (window.ethereum) {
        await window.ethereum.enable(); // Prompt user to connect their MetaMask account
        const web3 = new Web3(window.ethereum); // Initialize Web3 with MetaMask provider
        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(ComplaintContract, contractAddress);
        await contract.methods.Resolve(complaintId).send({ from: accounts[0] });
        // Optionally, you can show a success message or perform additional actions upon successful resolution
      } else {
        throw new Error('MetaMask is not installed.');
      }
    } catch (error) {
      console.error('Error resolving complaint:', error);
      setError('An error occurred while resolving complaint. Please try again.');
    }
  };

  return (
<div className="resolve-page"> {/* Add className */}
      <h2>Resolve Complaint</h2>
      <label>
        Complaint ID:
        <input type="text" value={complaintId} onChange={(e) => setComplaintId(e.target.value)} />
      </label>
      <button className="resolve-button" onClick={handleResolve}>Resolve</button> {/* Add className */}
      {error && <p className="error-message">Error: {error}</p>} {/* Add className */}
    </div>
  );
}

export default ResolvePage;
