import { useEffect, useState } from "react";
import { getContract } from "./contract";
import { useWallet } from "./WalletContext";

export default function CertificateHistory() {
  const { account } = useWallet();
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (account) loadHistory();
  }, [account]);

  async function loadHistory() {
    try {
      const contract = await getContract();
      if (!contract) return;

      const filter = contract.filters.CertificateIssued;
      const events = await contract.queryFilter(filter);

      const data = events.map((e) => ({
        certId: e.args[0],
        student: e.args[2],
        course: e.args[3],
        issuedAt: new Date(
          Number(e.args[4]) * 1000
        ).toLocaleString(),
      }));

      setHistory(data.reverse());
    } catch {
      setError("Failed to load history");
    }
  }

  return (
    <>
      <h2>Certificate History</h2>

      {!account && <p>Connect wallet to view history</p>}
      {error && <p className="error">{error}</p>}

      {history.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Cert ID</th>
              <th>Student</th>
              <th>Course</th>
              <th>Issued On</th>
            </tr>
          </thead>
          <tbody>
            {history.map((c, i) => (
              <tr key={i}>
                <td>{c.certId}</td>
                <td>{c.student}</td>
                <td>{c.course}</td>
                <td>{c.issuedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
