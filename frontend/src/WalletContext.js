
import { createContext, useContext, useEffect, useState } from "react";

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);

  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask not installed");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);

    const chain = await window.ethereum.request({
      method: "eth_chainId",
    });
    setChainId(chain);
  }

  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum.on("accountsChanged", (accounts) => {
      setAccount(accounts[0] || null);
    });

    window.ethereum.on("chainChanged", (chain) => {
      setChainId(chain);
    });
  }, []);

  return (
    <WalletContext.Provider value={{ account, chainId, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
