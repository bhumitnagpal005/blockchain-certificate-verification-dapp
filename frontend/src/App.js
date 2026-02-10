import "./App.css";
import IssueCertificate from "./IssueCertificate";
import VerifyCertificate from "./VerifyCertificate";
import CertificateHistory from "./CertificateHistory";
import { useWallet } from "./WalletContext";

function App() {
  const { account, connectWallet } = useWallet();

  return (
    <div className="container">
      <h1 className="title">Blockchain-Based Certificate Issuance & Verification</h1>

      {!account ? (
        <div className="center">
          <button className="primary-btn" onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      ) : (
        <p className="wallet">
          Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </p>
      )}

      <div className="card">
        <IssueCertificate />
      </div>

      <div className="card">
        <VerifyCertificate />
      </div>

      <div className="card">
        <CertificateHistory />
      </div>
    </div>
  );
}

export default App;
