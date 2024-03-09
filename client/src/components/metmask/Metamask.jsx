import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Metamask() {
  const [currentAccount, setCurrentAccount] = useState(null);

  useEffect(() => {
    async function checkIfWalletIsConnected() {
      if (window.ethereum) {
        try {
          await connectMetamask();
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("Please install MetaMask to use this dApp");
      }
    }

    checkIfWalletIsConnected();
  }, []);

  async function connectMetamask() {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  }

  function disconnectMetamask() {
    setCurrentAccount(null);
    // You might want to add additional cleanup here if necessary
  }

  return (
    <div className="App">
      <nav>
        <ul className="navbar">
          {currentAccount ? (
            <li>
              <button onClick={disconnectMetamask}>Disconnect Metamask</button>
            </li>
          ) : (
            <li>
              <button onClick={connectMetamask}>Connect Metamask</button>
            </li>
          )}
        </ul>
      </nav>
      <header className="App-header">
        {currentAccount ? (
          <p>{currentAccount}</p>
        ) : (
          <p>Please connect to Metamask to proceed.</p>
        )}
      </header>
    </div>
  );
}

export default Metamask;
