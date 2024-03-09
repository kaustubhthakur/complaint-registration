import React, { useState,useEffect } from 'react';
import Web3 from 'web3';
import Layout from "../../Layout"
import "./Homepage.css"
import ResolvePage from '../../pages/resolve/ResolvePage';
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

const Homepage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeComplaints, setActiveComplaints] = useState(null);
  useEffect(() => {
    async function fetchComplaints() {
      try {
        if (typeof window.ethereum !== 'undefined') {
          // MetaMask is installed
          const web3 = new Web3(window.ethereum);
          await window.ethereum.enable(); // Request account access
          const accounts = await web3.eth.getAccounts();
          const contract = new web3.eth.Contract(ComplaintContract, contractAddress);
          const allComplaints = await contract.methods.getAllComplaints().call({ from: accounts[0] });
          setComplaints(allComplaints);
          setLoading(false);
        } else {
          throw new Error('MetaMask is not installed.');
        }
      } catch (error) {
        console.error('Error fetching complaints:', error);
        setError(error.message || 'An error occurred while fetching complaints. Please try again.');
        setLoading(false);
      }
    }

    fetchComplaints();
  }, []);
  useEffect(() => {
    const fetchActiveComplaints = async () => {
      if (web3) {
        try {
          const contract = new web3.eth.Contract(ComplaintContract, contractAddress);
          const activeComplaintsCount = await contract.methods.activecomplaints().call();
          setActiveComplaints(activeComplaintsCount);
        } catch (error) {
          console.error('Error fetching active complaints:', error);
        }
      }
    };
    fetchActiveComplaints();
  }, []);
  const handleResolve = (id) => {
    const updatedComplaints = complaints.map((complaint, index) => {
      if (index === id) {
        return { ...complaint, resolved: true };
      }
      return complaint;
    });
    setComplaints(updatedComplaints);
  };

  return (
   <div className='homepage-container'>
     <Layout />
    <h2 className='homepage-heading'>Registered Complaints</h2>
    {loading ? (
      <p className='loading-heading'>Loading...</p>
    ) : error ? (
      <p className='error-message'>{error}</p>
    ) : complaints.length === 0 ? (
      <p className="no-complaints-message">No complaints registered yet.</p>
    ) : (
      <ul className='complaints-list'> {/* Add class name to the complaints list */}
        {complaints.map((complaint, index) => (
          <li key={index} className="complaint-item"> {/* Add class name to each complaint item */}
            <strong>ID:</strong> {index}, <strong>Complaint:</strong> {complaint.complaint},{' '}
            <strong>Resolved:</strong> {complaint.resolved ? 'Yes' : 'No'}
            {!complaint.resolved && <ResolvePage id={index} onResolve={handleResolve} />}
          </li>
        ))}
      </ul>
    )}
   </div>
);
}

export default Homepage