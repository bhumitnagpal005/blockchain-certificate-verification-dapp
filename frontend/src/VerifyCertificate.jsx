import { useState } from "react";
import { getContract } from "./contract";

export default function VerifyCertificate() {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState(null);
  const [checked, setChecked] = useState(false);

  async function verify() {
    setChecked(false);
    const contract = await getContract();
    const res = await contract.verifyCertificate(certId);
    setResult(res);
    setChecked(true);
  }

  return (
    <>
      <h2>Verify Certificate</h2>

      <div className="form-grid single">
        <input
          placeholder="Certificate ID"
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
        />
      </div>

      <button className="primary-btn" onClick={verify}>
        Verify
      </button>

      {/* RESULT SECTION */}
      {checked && result && (
        result[0] ? (
          <div className="success">
            <p>✅ <b>Certificate is VALID</b></p>
            <p><b>Student:</b> {result[2]}</p>
            <p><b>Course:</b> {result[3]}</p>
            <p>
              <a
                href={`https://gateway.pinata.cloud/ipfs/${result[1]}`}
                target="_blank"
                rel="noreferrer"
              >
                View Certificate PDF
              </a>
            </p>
          </div>
        ) : (
          <div className="error">
            <p>❌ <b>Certificate NOT FOUND or INVALID</b></p>
            <p>Please check the Certificate ID.</p>
          </div>
        )
      )}
    </>
  );
}
