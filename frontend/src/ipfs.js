import axios from "axios";

const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4ZDY5ZjNiMC1mZDNmLTQyYTYtYWY1ZC02M2MzOGFmMWY0OGYiLCJlbWFpbCI6Im5hZ3BhbGJodW1pdDAyNkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZGFkZDVmZDcxODgyYzc0ODVmNzMiLCJzY29wZWRLZXlTZWNyZXQiOiIyMzU1NmM0MjFkMmI1ZDRiYmZiM2EyOTA5YzlhMzY3M2NlNjk0M2YzNGVjNDBmYWZmOWMyN2IwMTk5NDcyZDNmIiwiZXhwIjoxODAyMTkxMjg3fQ.N7UjdPVSM20wUyPhs-AUTKBi2CWQznnqHdDzR0ruiv0";

export async function uploadToIPFS(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      maxBodyLength: "Infinity",
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data.IpfsHash;
}
