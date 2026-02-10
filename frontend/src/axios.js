import axios from "axios";

export async function uploadToIPFS(file) {
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

  let data = new FormData();
  data.append("file", file);

  const res = await axios.post(url, data, {
    headers: {
      pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
      pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.IpfsHash;
}
