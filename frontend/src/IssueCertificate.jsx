import { useState } from "react";
import { getContract } from "./contract";
import { uploadToIPFS } from "./ipfs";

export default function IssueCertificate() {
  const [certId, setCertId] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  async function issue() {
    try {
      if (!file) {
        setMsg("❌ Please upload PDF");
        return;
      }

      setMsg("Uploading PDF to IPFS...");
      const ipfsHash = await uploadToIPFS(file);

      setMsg("Issuing certificate on blockchain...");
      const contract = await getContract();

      const tx = await contract.issueCertificate(
        certId,
        ipfsHash,
        name,
        course
      );
      await tx.wait();

      setMsg("✅ Certificate issued successfully");

      setCertId("");
      setName("");
      setCourse("");
      setFile(null);
    } catch (err) {
      console.error(err);
      setMsg("❌ Issue failed");
    }
  }

  return (
    <>
      <h2>Issue Certificate</h2>

      <div className="form-grid">
        <input
          placeholder="Certificate ID"
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
        />

        <input
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
      </div>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button className="primary-btn" onClick={issue}>
        Issue Certificate
      </button>

      {msg && <div className="success">{msg}</div>}
    </>
  );
}
