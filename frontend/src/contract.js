import { ethers } from "ethers";

export const CONTRACT_ADDRESS =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const ABI = [
  "function issueCertificate(string,string,string,string)",
  "function verifyCertificate(string) view returns (bool,string,string,string,uint256)",
  "event CertificateIssued(string,string,string,string,uint256)",
];

export async function getContract() {
  if (!window.ethereum) {
    alert("MetaMask not found");
    return null;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
}
