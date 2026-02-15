# Blockchain Certificate Issuance & Verification DApp

A full-stack blockchain-based application to issue, verify, and track academic certificates securely.

## 🚀 Features
- Issue certificates on Ethereum blockchain
- Verify certificate authenticity using Certificate ID
- Decentralized storage using IPFS (PDF upload)
- MetaMask wallet integration
- Certificate issuance history
- Tamper-proof verification

## 🛠 Tech Stack
- Solidity
- Hardhat
- Ethereum
- React.js
- Ethers.js
- IPFS (Pinata)
- MetaMask

## 📸 Screenshots

### Issue Certificate
![Issue Certificate](screenshots/issue-certificate.png)

### Verify Certificate
![Verify Certificate](screenshots/verify-certificate.png)

### Certificate History
![Certificate History](screenshots/certificate-history.png)


## 🚀 Future Roadmap & Enhancements
While this MVP successfully demonstrates the core flow of decentralized certificate issuance and verification, the following features are planned for production-grade scaling:

* **Soulbound Tokens (SBTs):** Transitioning from simple mappings to non-transferable ERC-721 tokens to ensure certificates stay locked to the recipient's identity.
* **Institutional RBAC:** Implementing OpenZeppelin's `AccessControl` to restrict minting rights to verified educational institutions.
* **Batch Issuance:** Optimizing gas costs by allowing institutions to issue multiple certificates in a single transaction.
* **On-Chain Hash Verification:** Adding a secondary layer of security by comparing local PDF hashes against stored blockchain CIDs to prevent tampering.


## ⚙️ How to Run Locally

```bash
npm install
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
cd frontend
npm start
